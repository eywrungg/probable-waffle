export type AuthProvider = 'github'

export type GuestbookEntry = {
  id: string
  user_id?: string | null
  name: string
  username?: string | null
  avatar_url?: string | null
  provider?: string | null
  message: string
  role?: string | null
  created_at: string
}

export type GuestbookSession = {
  access_token: string
  refresh_token?: string
  expires_at?: number
}

export type GuestbookUser = {
  id: string
  email?: string
  name: string
  username?: string
  avatar_url?: string
  provider?: string
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY
const sessionKey = 'portfolio_guestbook_session'
const anonymousNameKey = 'portfolio_guestbook_anonymous_name'

export const guestbookConfigured = Boolean(supabaseUrl && supabaseKey)

function getPublicHeaders() {
  if (!supabaseKey) {
    throw new Error('Missing Supabase browser key')
  }

  return {
    apikey: supabaseKey,
    'Content-Type': 'application/json',
  }
}

function getAuthedHeaders(session: GuestbookSession) {
  if (!supabaseKey) {
    throw new Error('Missing Supabase browser key')
  }

  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  }
}

async function readSupabaseError(response: Response, fallback: string) {
  const contentType = response.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('application/json')) {
      const data = await response.json()
      const message =
        data?.msg ||
        data?.message ||
        data?.error_description ||
        data?.error ||
        fallback
      return typeof message === 'string' ? message : fallback
    }

    const text = await response.text()
    return text.trim() || fallback
  } catch {
    return fallback
  }
}

function readStoredSession() {
  const raw = window.localStorage.getItem(sessionKey)
  if (!raw) return null

  try {
    const session = JSON.parse(raw) as GuestbookSession
    if (session.expires_at && session.expires_at < Date.now()) {
      window.localStorage.removeItem(sessionKey)
      return null
    }

    return session.access_token ? session : null
  } catch {
    window.localStorage.removeItem(sessionKey)
    return null
  }
}

function writeSession(session: GuestbookSession) {
  window.localStorage.setItem(sessionKey, JSON.stringify(session))
}

export function captureGuestbookSessionFromUrl() {
  if (typeof window === 'undefined') return null

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')

  if (!accessToken) return readStoredSession()

  const expiresIn = Number(params.get('expires_in') ?? 3600)
  const session: GuestbookSession = {
    access_token: accessToken,
    refresh_token: params.get('refresh_token') ?? undefined,
    expires_at: Date.now() + Math.max(expiresIn - 30, 60) * 1000,
  }

  writeSession(session)
  window.history.replaceState(null, document.title, window.location.pathname)
  return session
}

export function getGuestbookSession() {
  if (typeof window === 'undefined') return null
  return readStoredSession()
}

export function signOutGuestbook() {
  window.localStorage.removeItem(sessionKey)
}

export function signInWithGuestbookProvider(provider: AuthProvider) {
  if (!guestbookConfigured || !supabaseUrl) {
    throw new Error('Guestbook is not configured yet')
  }

  const redirectTo = `${window.location.origin}/guestbook`
  const authUrl = new URL(`${supabaseUrl}/auth/v1/authorize`)
  authUrl.searchParams.set('provider', provider)
  authUrl.searchParams.set('redirect_to', redirectTo)
  authUrl.searchParams.set('response_type', 'token')
  window.location.href = authUrl.toString()
}

const anonymousAdjectives = [
  'Captivating',
  'Curious',
  'Brilliant',
  'Midnight',
  'Electric',
  'Kindred',
  'Orbit',
  'Pixel',
  'Clever',
  'Golden',
]

export function getAnonymousGuestbookName() {
  const existing = window.localStorage.getItem(anonymousNameKey)
  if (existing) return existing

  const adjective = anonymousAdjectives[Math.floor(Math.random() * anonymousAdjectives.length)]
  const number = Math.floor(100 + Math.random() * 900)
  const name = `${adjective} ${number}`
  window.localStorage.setItem(anonymousNameKey, name)
  return name
}

function profileName(data: any) {
  return (
    data?.user_metadata?.full_name ||
    data?.user_metadata?.name ||
    data?.user_metadata?.user_name ||
    data?.user_metadata?.preferred_username ||
    data?.email?.split('@')[0] ||
    'Guest'
  )
}

export async function getGuestbookUser(session: GuestbookSession) {
  if (!guestbookConfigured || !supabaseUrl) return null

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: getAuthedHeaders(session),
  })

  if (!response.ok) {
    signOutGuestbook()
    throw new Error('Unable to read signed-in account')
  }

  const data = await response.json()
  const metadata = data.user_metadata ?? {}

  return {
    id: data.id,
    email: data.email,
    name: profileName(data),
    username: metadata.user_name || metadata.preferred_username || metadata.name,
    avatar_url: metadata.avatar_url || metadata.picture,
    provider: data.app_metadata?.provider,
  } as GuestbookUser
}

export async function listGuestbookEntries() {
  if (!guestbookConfigured || !supabaseUrl) return [] as GuestbookEntry[]

  const fullSelect =
    'id,user_id,name,username,avatar_url,provider,message,role,created_at'
  const response = await fetch(
    `${supabaseUrl}/rest/v1/guestbook_entries?select=${fullSelect}&order=created_at.desc`,
    { headers: getPublicHeaders() },
  )

  if (response.ok) {
    return (await response.json()) as GuestbookEntry[]
  }

  const legacyResponse = await fetch(
    `${supabaseUrl}/rest/v1/guestbook_entries?select=id,name,message,role,created_at&order=created_at.desc`,
    { headers: getPublicHeaders() },
  )

  if (!legacyResponse.ok) {
    throw new Error(await readSupabaseError(legacyResponse, 'Failed to load guestbook entries'))
  }

  return (await legacyResponse.json()) as GuestbookEntry[]
}

export async function createGuestbookEntry(input: {
  message: string
  user: GuestbookUser
  session: GuestbookSession
}) {
  if (!guestbookConfigured || !supabaseUrl) {
    throw new Error('Guestbook is not configured yet')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/guestbook_entries`, {
    method: 'POST',
    headers: {
      ...getAuthedHeaders(input.session),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      user_id: input.user.id,
      name: input.user.name,
      username: input.user.username || null,
      avatar_url: input.user.avatar_url || null,
      provider: input.user.provider || null,
      role: input.user.provider || null,
      message: input.message,
    }),
  })

  if (!response.ok) {
    throw new Error(await readSupabaseError(response, 'Failed to save guestbook entry'))
  }

  const [entry] = (await response.json()) as GuestbookEntry[]
  return entry
}

export async function createAnonymousGuestbookEntry(input: {
  name: string
  message: string
}) {
  if (!guestbookConfigured || !supabaseUrl) {
    throw new Error('Guestbook is not configured yet')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/guestbook_entries`, {
    method: 'POST',
    headers: {
      ...getPublicHeaders(),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      user_id: null,
      name: input.name,
      username: null,
      avatar_url: null,
      provider: 'anonymous',
      role: 'anonymous',
      message: input.message,
    }),
  })

  if (!response.ok) {
    throw new Error(await readSupabaseError(response, 'Failed to save anonymous guestbook entry'))
  }

  const [entry] = (await response.json()) as GuestbookEntry[]
  return entry
}
