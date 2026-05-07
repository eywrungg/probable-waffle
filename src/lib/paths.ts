const baseUrl = import.meta.env.BASE_URL || '/'

export const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

function isSafeInternalPath(path: string) {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')
}

export function withBase(path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path

  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${basePath}${cleanPath}`
}

export function restoreRedirectPath() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect')
  if (!redirect || !isSafeInternalPath(redirect)) return

  const base = basePath.replace(/\/+$/, '')
  window.history.replaceState(null, document.title, `${base}${redirect}${window.location.hash}`)
}

export function currentPathname() {
  const base = basePath.replace(/\/+$/, '')
  let pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (base && base !== '/' && (pathname === base || pathname.startsWith(`${base}/`))) {
    pathname = pathname.slice(base.length) || '/'
  }

  return pathname
}
