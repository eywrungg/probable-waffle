import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { allProjects } from '../data/projects'
import { withBase } from '../lib/paths'

const projectGroups = [
  {
    title: 'Development Projects',
    description: 'Web apps, APIs, games, and portfolio builds.',
  },
  {
    title: 'App & AR Projects',
    description: 'Mobile APK work, Unity campus navigation, and AR-focused builds.',
  },
  {
    title: 'Creative Works',
    description: 'UI design practice, Photoshop posters, photography, and visual editing work.',
  },
] as const

export default function ProjectsArchive() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pb-20 pt-28">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <a
          href={withBase('/#projects')}
          className="inline-flex items-center gap-2 font-medium"
          style={{ color: 'var(--ink-2)' }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </a>
        <h1 className="text-4xl font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
          All Projects
        </h1>
      </div>

      <div className="space-y-14">
        {projectGroups.map((group) => {
          const items = allProjects.filter((project) => (project.category ?? 'Development Projects') === group.title)
          if (items.length === 0) return null

          return (
            <section key={group.title}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
                  {group.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                  {group.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((project) => {
                  const gallery = project.gallery ?? [project.image]
                  const isPortrait = project.orientation === 'portrait'
                  return (
                    <article
                      key={project.index}
                      className="rounded-[1.6rem] border p-4 transition-colors sm:p-5"
                      style={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        boxShadow: 'var(--card-shadow)',
                      }}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                          {project.index}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-3)' }}>
                          {project.label}
                        </span>
                      </div>

                      {gallery.length > 1 ? (
                        <div
                          className={`mb-5 grid gap-2 ${
                            isPortrait ? 'grid-cols-2' : gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                          }`}
                        >
                          {gallery.map((image) => (
                            <div
                              key={image}
                              className={`${isPortrait ? 'aspect-[9/14]' : 'aspect-[4/3]'} overflow-hidden rounded-[1rem] border`}
                              style={{ background: '#080808', borderColor: 'color-mix(in srgb, var(--ink) 9%, transparent)' }}
                            >
                              <img src={image} alt={`${project.title} preview`} className="h-full w-full object-contain" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`mb-5 overflow-hidden rounded-[1.15rem] border ${
                            isPortrait ? 'mx-auto aspect-[9/14] max-h-[30rem] w-full max-w-[19rem]' : 'aspect-[1.75/1]'
                          }`}
                          style={{ borderColor: 'color-mix(in srgb, var(--ink) 9%, transparent)' }}
                        >
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className={`h-full w-full ${isPortrait ? 'object-contain' : 'object-cover object-top'}`}
                          />
                        </div>
                      )}

                      <h2 className="text-xl font-semibold tracking-tight sm:text-[2rem]" style={{ color: 'var(--ink)' }}>
                        {project.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--ink-2)' }}>
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]"
                            style={{
                              color: 'var(--ink-3)',
                              borderColor: 'var(--border)',
                              background: 'var(--surface)',
                            }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em]"
                          style={{ color: 'var(--ink-3)' }}
                        >
                          Visit Project <ArrowUpRight size={12} />
                        </a>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
