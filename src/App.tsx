import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import About from './sections/About'
import Footer from './components/Footer'
import ProjectsArchive from './pages/ProjectsArchive'
import AchievementsPage from './pages/AchievementsPage'
import GuestbookPage from './pages/GuestbookPage'

const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const Other = lazy(() => import('./sections/Other'))
const Contact = lazy(() => import('./sections/Contact'))
const Blog = lazy(() => import('./sections/Blog'))

const Divider = () => <div style={{ borderTop: '1px solid var(--border)' }} />

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const isProjectsPage = pathname === '/projects'
  const isAchievementsPage = pathname === '/achievements'
  const isGuestbookPage = pathname === '/guestbook'
  const isBlogPage = pathname === '/blog'

  return (
    <>
      <Nav />
      <div
        className="noise interactive-bg min-h-screen pt-12 sm:pt-14"
        style={{
          backgroundColor: 'var(--bg)',
          backgroundImage: 'var(--app-bg)',
          backgroundSize: 'var(--app-bg-size)',
          backgroundPosition: 'var(--app-bg-position)',
          ['--mx' as string]: '50vw',
          ['--my' as string]: '50vh',
        }}
        onMouseMove={(e) => {
          const el = e.currentTarget
          el.style.setProperty('--mx', `${e.clientX}px`)
          el.style.setProperty('--my', `${e.clientY}px`)
        }}
      >
        <div
          aria-hidden
          className="dark-glow pointer-events-none fixed inset-0 z-0"
          style={{
            background: 'none',
          }}
        />

        {isProjectsPage ? (
          <ProjectsArchive />
        ) : isAchievementsPage ? (
          <AchievementsPage />
        ) : isGuestbookPage ? (
          <GuestbookPage />
        ) : isBlogPage ? (
          <main>
            <Suspense fallback={null}>
              <Blog />
            </Suspense>
          </main>
        ) : (
          <main>
            <About />
            <Suspense fallback={null}>
              <Divider />
              <Projects />
              <Divider />
              <Skills />
              <Divider />
              <Other />
              <Divider />
              <Contact />
            </Suspense>
          </main>
        )}

        <Footer />
      </div>
    </>
  )
}
