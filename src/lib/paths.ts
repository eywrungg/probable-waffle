const baseUrl = import.meta.env.BASE_URL || '/'

export const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

export function withBase(path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path

  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${basePath}${cleanPath}`
}

export function currentPathname() {
  const base = basePath.replace(/\/+$/, '')
  let pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (base && base !== '/' && (pathname === base || pathname.startsWith(`${base}/`))) {
    pathname = pathname.slice(base.length) || '/'
  }

  return pathname
}
