import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon, Menu, X, Calendar } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'
import ContactSheet from './ContactSheet'

const NAV_LINKS = [
  { label: 'Home', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Other', href: '#other' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['about', 'projects', 'skills', 'other', 'contact']

export default function Nav() {
  const { theme, toggle } = useTheme()
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const isProjectsPage = pathname === '/projects'
  const isOtherPage = pathname === '/achievements' || pathname === '/guestbook' || pathname === '/blog'
  const [active, setActive] = useState(
    isProjectsPage ? 'projects' : isOtherPage ? 'other' : 'about',
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactSheetOpen, setContactSheetOpen] = useState(false)

  useEffect(() => {
    if (isProjectsPage) {
      setActive('projects')
      return
    }

    if (isOtherPage) {
      setActive('other')
      return
    }

    const updateActive = () => {
      const scrollMarker = window.innerHeight * 0.28
      let current = 'about'

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= scrollMarker) current = id
      }

      setActive(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    window.addEventListener('hashchange', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
      window.removeEventListener('hashchange', updateActive)
    }
  }, [isOtherPage, isProjectsPage])

  const handleLink = (href: string) => {
    setMobileOpen(false)

    if (isProjectsPage || isOtherPage) {
      if (href === '#projects') {
        setActive('projects')
        if (isProjectsPage) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.location.href = '/#projects'
        }
        return
      }

      if (href === '#other') {
        setActive('other')
        if (isOtherPage) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.location.href = '/#other'
        }
        return
      }

      window.location.href = `/${href}`
      return
    }

    setActive(href.slice(1))
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="fixed left-0 right-0 top-2 z-50 px-3 pb-2 pt-3" style={{ background: 'transparent' }}>
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div />
          <div className="flex justify-center">
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="pointer-events-auto"
            >
              <div
                className="flex h-12 items-center gap-2 border border-border/60 px-4"
                style={{
                  borderRadius: '9999px',
                  background: 'var(--nav-bg)',
                  boxShadow: 'var(--nav-shadow)',
                }}
              >
                <ul className="relative hidden items-center gap-1.5 md:flex">
                  {NAV_LINKS.map((link) => {
                    const isActive = active === link.href.slice(1)
                    return (
                      <li key={link.href} className="relative">
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0"
                            style={{
                              borderRadius: '9999px',
                              background: 'var(--accent)',
                              boxShadow: '0 0 16px 2px rgba(255,255,255,0.22)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                        <button
                          onClick={() => handleLink(link.href)}
                          className={`relative z-10 px-5 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                            isActive ? '' : 'text-ink-2 hover:text-ink'
                          }`}
                          style={{ borderRadius: '9999px', color: isActive ? '#000' : undefined }}
                        >
                          {link.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <span className="mx-1.5 hidden h-4 w-px bg-border md:block" />

                <button
                  onClick={toggle}
                  aria-label="Toggle theme"
                  className="flex h-10 w-10 items-center justify-center text-ink-3 transition-all duration-200 hover:bg-border/60 hover:text-ink"
                  style={{ borderRadius: '9999px' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={theme}
                      initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.span>
                  </AnimatePresence>
                </button>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                  className="ml-0.5 flex h-10 w-10 items-center justify-center text-ink-3 transition-all duration-200 hover:bg-border/60 hover:text-ink md:hidden"
                  style={{ borderRadius: '9999px' }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              </div>
            </motion.nav>
          </div>

          <div className="hidden justify-end lg:flex">
            <Button
              onClick={() => setContactSheetOpen(true)}
              variant="outline"
              className="h-11 shrink-0 border-border/60 px-4 text-[13px] shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <Calendar size={12} />
              Book a Call
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-border/60 md:hidden"
              style={{
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: 'var(--nav-shadow)',
              }}
            >
              <ul className="p-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLink(link.href)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ${
                        active === link.href.slice(1)
                          ? 'text-ink'
                          : 'text-ink-2 hover:bg-border/40 hover:text-ink'
                      }`}
                      style={
                        active === link.href.slice(1)
                          ? {
                              background: 'var(--accent)',
                              boxShadow: '0 0 16px 2px rgba(255,255,255,0.22)',
                              color: '#000',
                            }
                          : undefined
                      }
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="px-1 pt-1">
                  <Button
                    onClick={() => {
                      setMobileOpen(false)
                      setContactSheetOpen(true)
                    }}
                    variant="outline"
                    className="w-full justify-center text-xs"
                  >
                    <Calendar size={12} />
                    Book a Call
                  </Button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactSheet open={contactSheetOpen} onClose={() => setContactSheetOpen(false)} />
    </>
  )
}
