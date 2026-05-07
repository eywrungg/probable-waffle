import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  LoaderCircle,
  LogOut,
  MessageSquareQuote,
} from 'lucide-react'
import {
  captureGuestbookSessionFromUrl,
  createAnonymousGuestbookEntry,
  createGuestbookEntry,
  getAnonymousGuestbookName,
  getGuestbookUser,
  guestbookConfigured,
  listGuestbookEntries,
  signInWithGuestbookProvider,
  signOutGuestbook,
  guestbookMessageMaxLength,
  type GuestbookEntry,
  type GuestbookSession,
  type GuestbookUser,
} from '../lib/guestbook'
import { withBase } from '../lib/paths'

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.max(1, Math.floor(diff / 60000))
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

function formatMonthYear(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [session, setSession] = useState<GuestbookSession | null>(null)
  const [user, setUser] = useState<GuestbookUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupNotice, setSetupNotice] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [anonymousMessage, setAnonymousMessage] = useState('')
  const [anonymousName, setAnonymousName] = useState('')

  useEffect(() => {
    let mounted = true
    setAnonymousName(getAnonymousGuestbookName())

    const load = async () => {
      const captured = captureGuestbookSessionFromUrl()
      if (mounted) setSession(captured)

      if (captured) {
        try {
          const account = await getGuestbookUser(captured)
          if (mounted) setUser(account)
        } catch (err) {
          if (mounted) setError(err instanceof Error ? err.message : 'Unable to sign in')
        }
      }

      if (!guestbookConfigured) {
        if (mounted) {
          setLoading(false)
          setAuthLoading(false)
        }
        return
      }

      try {
        const data = await listGuestbookEntries()
        if (mounted) setEntries(data)
      } catch (err) {
        if (mounted) {
          setSetupNotice(
            err instanceof Error
              ? 'Guestbook storage is waiting for the Supabase migration.'
              : 'Guestbook storage is waiting for setup.',
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
          setAuthLoading(false)
        }
      }
    }

    void load()
    return () => {
      mounted = false
    }
  }, [])

  const canSubmit = useMemo(() => {
    return Boolean(user && session && message.trim().length >= 8)
  }, [message, session, user])

  const canSubmitAnonymous = useMemo(() => {
    return Boolean(anonymousName && anonymousMessage.trim().length >= 8)
  }, [anonymousMessage, anonymousName])

  const anonymousCharsRemaining = Math.max(0, 8 - anonymousMessage.trim().length)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSubmit || !user || !session) return

    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const entry = await createGuestbookEntry({
        message: message.trim().slice(0, guestbookMessageMaxLength),
        user,
        session,
      })
      setEntries((prev) => [entry, ...prev])
      setMessage('')
      setSuccess('Your message is live on the wall.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to post your message')
    } finally {
      setSubmitting(false)
    }
  }

  const onAnonymousSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSubmitAnonymous) return

    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const entry = await createAnonymousGuestbookEntry({
        name: anonymousName,
        message: anonymousMessage.trim().slice(0, guestbookMessageMaxLength),
      })
      setEntries((prev) => [entry, ...prev])
      setAnonymousMessage('')
      setSuccess(`Posted as ${anonymousName}.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to post your anonymous message')
    } finally {
      setSubmitting(false)
    }
  }

  const signOut = () => {
    signOutGuestbook()
    setUser(null)
    setSession(null)
    setSuccess(null)
  }

  return (
    <main className="relative mx-auto min-h-screen max-w-6xl overflow-hidden px-6 pb-24 pt-28">
      <a href={withBase('/#other')} className="inline-flex items-center gap-2 text-lg" style={{ color: 'var(--ink-2)' }}>
        <ArrowLeft size={20} />
        Back to home
      </a>

      <div className="mx-auto max-w-5xl pb-12 pt-14 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
          The community wall
        </p>
        <h1
          className="mt-5 text-6xl font-semibold leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl"
          style={{ color: 'var(--ink)', fontFamily: '"Archivo Black", "Space Grotesk", sans-serif' }}
        >
          Leave Your <span style={{ color: 'var(--accent)' }}>Mark</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed sm:text-2xl" style={{ color: 'var(--ink-3)' }}>
          Share your thoughts, feedback, or just say hi!
        </p>
      </div>

      <section className="mx-auto max-w-5xl">
        <div
          className="rounded-[2rem] border px-6 py-9 sm:px-8"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, transparent), rgba(255,255,255,0.02) 38%, var(--card))',
            borderColor: 'color-mix(in srgb, var(--accent) 38%, transparent)',
            boxShadow: '0 0 56px color-mix(in srgb, var(--accent) 14%, transparent), var(--card-shadow)',
          }}
        >
          {!guestbookConfigured ? (
            <div className="text-center">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                Supabase is not connected yet.
              </p>
            </div>
          ) : authLoading ? (
            <div className="flex items-center justify-center gap-3" style={{ color: 'var(--ink-3)' }}>
              <LoaderCircle size={16} className="animate-spin" />
              Checking your account...
            </div>
          ) : user ? (
            <form onSubmit={onSubmit}>
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-lg font-semibold"
                    style={{ background: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--ink)' }}
                  >
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      user.name.slice(0, 1).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>
                      {user.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--ink-3)' }}>
                      Signed in with {user.provider ?? 'Supabase'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center gap-2 rounded-[1rem] border px-4 py-3 text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink-2)' }}
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={guestbookMessageMaxLength}
                placeholder="Leave a thoughtful message..."
                rows={5}
                className="mt-6 w-full rounded-[1.1rem] border px-4 py-4 outline-none"
                style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink)' }}
              />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm" style={{ color: error ? '#fca5a5' : success ? '#86efac' : 'var(--ink-3)' }}>
                  {error || success || 'Messages post with your public account name and avatar.'}
                </div>
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-[1rem] border px-5 py-3 font-medium transition-opacity disabled:opacity-50"
                  style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink)' }}
                >
                  {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <MessageSquareQuote size={16} />}
                  Post to guestbook
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-xl leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                Sign in with GitHub to pin your message to this board forever.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => signInWithGuestbookProvider('github')}
                  className="inline-flex items-center justify-center gap-3 rounded-[1rem] border px-6 py-4 text-base font-semibold"
                  style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink)' }}
                >
                  <GithubIcon />
                  Sign in with GitHub
                </button>
              </div>
              {error ? (
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed" style={{ color: '#fca5a5' }}>
                  {error}
                </p>
              ) : null}
              {setupNotice ? (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                  {setupNotice} Apply the files in `supabase/migrations`, then make sure GitHub is enabled in Supabase Auth before the sign-in button can redirect.
                </p>
              ) : null}

              <div className="my-8 flex items-center gap-3">
                <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-4)' }}>
                  or
                </span>
                <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <form onSubmit={onAnonymousSubmit} className="mx-auto max-w-2xl text-left">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm" style={{ color: 'var(--ink-3)' }}>
                    Post anonymously as <span style={{ color: 'var(--ink)' }}>{anonymousName}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.localStorage.removeItem('portfolio_guestbook_anonymous_name')
                      setAnonymousName(getAnonymousGuestbookName())
                    }}
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: 'var(--ink-4)' }}
                  >
                    New nickname
                  </button>
                </div>
                <textarea
                  value={anonymousMessage}
                  onChange={(e) => setAnonymousMessage(e.target.value)}
                  maxLength={guestbookMessageMaxLength}
                  placeholder="Leave an anonymous note..."
                  rows={4}
                  className="w-full rounded-[1.1rem] border px-4 py-4 outline-none"
                  style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink)' }}
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm" style={{ color: error ? '#fca5a5' : success ? '#86efac' : 'var(--ink-3)' }}>
                    {error || success || (anonymousCharsRemaining > 0
                      ? `Write ${anonymousCharsRemaining} more character${anonymousCharsRemaining > 1 ? 's' : ''} to post anonymously.`
                      : 'Anonymous notes still save publicly in Supabase.')}
                  </p>
                  <button
                    type="submit"
                    disabled={!canSubmitAnonymous || submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-[1rem] border px-5 py-3 font-medium transition-opacity disabled:opacity-50"
                    style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--ink)' }}
                  >
                    {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <MessageSquareQuote size={16} />}
                    Post anonymously
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="mt-14 space-y-4">
          {loading ? (
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--ink-3)' }}>
              <LoaderCircle size={16} className="animate-spin" />
              Loading the wall...
            </div>
          ) : entries.length === 0 ? (
            <div
              className="rounded-[1.8rem] border px-6 py-8 text-center"
              style={{ background: 'var(--card)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="text-lg" style={{ color: 'var(--ink-2)' }}>
                {setupNotice ? 'The wall is ready visually. Supabase storage just needs the migration applied.' : 'No messages yet. Be the first one to leave a note.'}
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-[1.8rem] border px-6 py-6"
                style={{ background: 'var(--card)', borderColor: 'rgba(255,255,255,0.07)', boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-lg font-semibold"
                    style={{ background: 'color-mix(in srgb, var(--accent) 18%, transparent)', color: 'var(--ink)' }}
                  >
                    {entry.avatar_url ? (
                      <img src={entry.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      entry.name.slice(0, 1).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[1.35rem] font-semibold tracking-normal" style={{ color: 'var(--ink)' }}>
                        {entry.name}
                      </p>
                      <span className="text-sm" style={{ color: 'var(--ink-3)' }}>
                        {formatMonthYear(entry.created_at)} / {formatRelative(entry.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm" style={{ color: 'var(--ink-3)' }}>
                      {entry.username ? `@${entry.username}` : entry.provider || entry.role || 'Guestbook visitor'}
                    </p>
                    <p className="mt-4 text-base leading-relaxed sm:text-[1.08rem]" style={{ color: 'var(--ink-2)' }}>
                      {entry.message}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
