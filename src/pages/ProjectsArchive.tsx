import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { allProjects } from '../data/projects'

export default function ProjectsArchive() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pb-20 pt-28">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <a
          href="/#projects"
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {allProjects.map((project) => (
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
        ))}
      </div>
    </main>
  )
}
