import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar, Copy, Check, Mail, X } from 'lucide-react'

const EMAIL = 'charlesarone@example.com'
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function ContactSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-0 pt-8 sm:items-center sm:px-6 sm:pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <motion.button
            type="button"
            aria-label="Close get in touch dialog"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 20%, rgba(251,146,60,0.08), transparent 34%), rgba(6,6,10,0.72)',
              backdropFilter: 'blur(12px)',
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          />

          <motion.div
            className="relative z-10 w-full max-w-[40rem] overflow-hidden rounded-t-[2rem] border px-5 pb-5 pt-4 sm:rounded-[2rem] sm:px-7 sm:pb-6 sm:pt-5"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--card) 92%, white 8%), var(--card))',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow:
                '0 28px 80px rgba(0,0,0,0.46), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
            initial={{ y: 96, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 96, opacity: 0, scale: 0.99 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.95,
            }}
          >
            <motion.div
              aria-hidden
              className="mx-auto mb-4 h-1.5 w-14 rounded-full sm:mb-3"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24, ease: EASE }}
            />

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[clamp(2.5rem,7vw,4.7rem)] font-semibold leading-[0.94] tracking-tight" style={{ color: 'var(--ink)' }}>
                  Get in touch
                </h3>
                <p className="mt-3 max-w-[30rem] text-base leading-relaxed sm:text-lg" style={{ color: 'var(--ink-2)' }}>
                  Let&apos;s build something great together.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--ink-3)', background: 'var(--surface)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${EMAIL}?subject=Book%20a%20Call&body=Hi%20Charles%2C%20I%27d%20like%20to%20book%20a%20call.`}
                className="rounded-[1.6rem] border px-6 py-6 transition-colors"
                style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <Calendar size={22} style={{ color: 'var(--accent)' }} />
                <div className="mt-10">
                  <p className="text-[1.6rem] font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
                    Book a call
                  </p>
                  <p className="mt-1 font-mono text-sm uppercase tracking-[0.12em]" style={{ color: 'var(--ink-3)' }}>
                    30 min intro
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="rounded-[1.6rem] border px-6 py-6 transition-colors"
                style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <Mail size={22} style={{ color: 'var(--accent)' }} />
                <div className="mt-10">
                  <p className="text-[1.6rem] font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
                    Email me
                  </p>
                  <p className="mt-1 font-mono text-sm uppercase tracking-[0.12em]" style={{ color: 'var(--ink-3)' }}>
                    Open mail
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-6 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-3 text-left"
                  style={{ color: copied ? 'var(--accent)' : 'var(--ink-2)' }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span className="font-medium">{copied ? 'Copied gmail address' : 'Copy gmail address'}</span>
                </button>

                <div className="flex items-center gap-5" style={{ color: 'var(--ink-3)' }}>
                  <a href="https://github.com/charlesalcebar" target="_blank" rel="noopener noreferrer">
                    <GithubIcon />
                  </a>
                  <a href="https://linkedin.com/in/charlesalcebar" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon />
                  </a>
                  <a href={`mailto:${EMAIL}`}>
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
