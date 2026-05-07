import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import Section from '../components/Section'
import { projects, type Project } from '../data/projects'
import { withBase } from '../lib/paths'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function ImageHolder({
  image,
  title,
}: {
  image: string
  title: string
}) {
  return (
    <div
      className="relative aspect-[1.36/1] overflow-hidden rounded-[1.5rem] border bg-[#121212] sm:aspect-[1.52/1] sm:rounded-[2rem]"
      style={{
        background: '#080808',
        borderColor: 'rgba(255,255,255,0.18)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 42%, rgba(255,255,255,0.08) 100%)',
        }}
      />
      <img src={image} alt={`${title} preview`} className="h-full w-full object-cover object-top" />
    </div>
  )
}

function ProjectModal({
  item,
  onClose,
}: {
  item: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!item) return

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
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <motion.button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.06), transparent 38%), rgba(0,0,0,0.68)',
              backdropFilter: 'blur(14px)',
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          />
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[1.5rem] border sm:rounded-[2rem]"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--card) 92%, white 8%), var(--card))',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow:
                '0 24px 70px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-32"
              style={{
                background: 'radial-gradient(circle at 50% 0%, var(--accent-dim), transparent 72%)',
                opacity: 0.55,
              }}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
              <div
                className="min-h-[16rem] border-b p-4 lg:min-h-[22rem] lg:border-b-0 lg:border-r"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="h-full overflow-hidden rounded-[1.45rem] border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <img src={item.image} alt={`${item.title} preview`} className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                        {item.index}
                      </span>
                      <span className="h-px w-8" style={{ background: 'var(--border)' }} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: item.accent }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <h3
                      className="text-3xl font-semibold leading-none tracking-normal sm:text-4xl lg:text-5xl"
                      style={{ color: 'var(--ink)', fontFamily: '"Archivo Black", "Space Grotesk", sans-serif' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--ink-3)', background: 'var(--surface)' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="max-w-[58ch] text-sm leading-relaxed sm:text-base lg:text-lg" style={{ color: 'var(--ink-2)' }}>
                  {item.description}
                </p>

                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: EASE, delay: 0.08 }}
                >
                  {item.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="grid grid-cols-[2rem_1fr] gap-3 rounded-[1.1rem] border px-4 py-4"
                      style={{ background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <span className="font-mono text-xs" style={{ color: item.accent }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                        {highlight}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-7 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: EASE, delay: 0.12 }}
                >
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]"
                      style={{ color: 'var(--ink-3)', borderColor: 'var(--border)', background: 'var(--surface)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>

                {item.href ? (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.28, ease: EASE, delay: 0.16 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border px-5 py-3 font-mono text-xs uppercase tracking-[0.14em]"
                      style={{ color: '#050505', borderColor: item.accent, background: item.accent }}
                    >
                      Visit Project <ArrowUpRight size={13} />
                    </a>
                  </motion.div>
                ) : null}
              </div>
            </div>
            <div
              className="relative border-t px-6 py-4 sm:px-8"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-4)' }}>
                  Featured case note
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: 'var(--ink-3)' }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function ProjectCard({
  item,
  onReadMore,
}: {
  item: Project
  onReadMore: (project: Project) => void
}) {
  return (
    <article className="group">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          {item.index}
        </span>
        <span className="h-px w-7" style={{ background: 'var(--border)' }} />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-3)' }}>
          {item.label}
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="max-w-none text-[2.15rem] font-semibold leading-[0.96] tracking-tight sm:max-w-[12ch] sm:text-[2.6rem]" style={{ color: 'var(--ink)' }}>
          {item.title}
        </h3>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors sm:inline-flex"
            style={{ borderColor: 'var(--border)', color: 'var(--ink-3)', background: 'var(--surface)' }}
          >
            Live Site <ArrowUpRight size={12} />
          </a>
        ) : null}
      </div>

      <div
        className="rounded-[1.8rem] border p-2.5 sm:rounded-[2.15rem] sm:p-4"
        style={{
          background: 'linear-gradient(180deg, #1c1c1c, #080808)',
          borderColor: 'rgba(255,255,255,0.18)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 16px 42px rgba(0,0,0,0.34)',
        }}
      >
        <div
          className="flex min-h-0 flex-col rounded-[1.55rem] border px-4 pb-4 pt-4 sm:min-h-[31rem] sm:rounded-[1.85rem] sm:px-7 sm:pb-7 sm:pt-7"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
            borderColor: 'rgba(255,255,255,0.16)',
          }}
        >
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-none text-[0.98rem] font-medium leading-[1.6] text-white sm:max-w-[24ch] sm:text-[1.12rem]">
              {item.description}
            </p>
            <button
              type="button"
              onClick={() => onReadMore(item)}
              className="inline-flex shrink-0 self-start items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.72)',
                color: '#f7f7f7',
              }}
            >
              Read More
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="mt-auto pt-1 sm:pt-0">
            <ImageHolder image={item.image} title={item.title} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-4 sm:pt-5">
        {item.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]"
            style={{ color: 'var(--ink-3)', borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            {chip}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <Section id="projects" className="mx-auto max-w-5xl px-5 py-24 sm:px-6 sm:py-28">
        <div className="mb-16 text-center sm:mb-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[4.35rem]" style={{ color: 'var(--ink)' }}>
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed sm:mt-5 sm:text-lg" style={{ color: 'var(--ink-3)' }}>
            A focused selection of the systems, websites, and API-driven builds that best represent how I design and ship software.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
          {projects.map((item) => (
            <ProjectCard key={item.index} item={item} onReadMore={setSelectedProject} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={withBase('/projects')}
            className="group inline-flex items-center gap-3 text-center"
            style={{
              color: 'var(--ink)',
              textShadow: '0 0 22px rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="text-lg font-semibold tracking-tight transition-transform duration-200 group-hover:-translate-x-0.5 sm:text-[1.18rem]"
              style={{ color: 'var(--ink)' }}
            >
              Explore all projects
            </span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Section>

      <ProjectModal item={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
