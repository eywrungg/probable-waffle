import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Section from '../components/Section'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const timeline = [
  {
    year: '2024 - Present',
    role: 'Capstone Developer',
    org: 'SMCBI - AR Navigation System',
    badge: 'Academic',
    tone: '#c96a3b',
    badgeStyle: {
      color: '#c96a3b',
      background: 'rgba(201,106,59,0.12)',
      borderColor: 'rgba(201,106,59,0.28)',
    },
  },
  {
    year: '2023',
    role: 'Frontend Developer',
    org: 'Freelance / Contract',
    badge: 'Freelance',
    tone: '#4b7496',
    badgeStyle: {
      color: '#4b7496',
      background: 'rgba(75,116,150,0.08)',
      borderColor: 'rgba(75,116,150,0.2)',
    },
  },
  {
    year: '2022 - 2023',
    role: 'Open Source Contributor',
    org: 'Personal Projects',
    badge: 'Open Source',
    tone: '#b88a42',
    badgeStyle: {
      color: '#b88a42',
      background: 'rgba(184,138,66,0.08)',
      borderColor: 'rgba(184,138,66,0.2)',
    },
  },
  {
    year: '2021',
    role: 'BS Information Technology',
    org: 'SMCBI',
    badge: 'Education',
    tone: '#5f9074',
    badgeStyle: {
      color: '#5f9074',
      background: 'rgba(95,144,116,0.08)',
      borderColor: 'rgba(95,144,116,0.22)',
    },
  },
  {
    year: '2019',
    role: 'Hello World',
    org: 'Wrote my first line of code',
    badge: null,
    tone: '#8f5f78',
    badgeStyle: null,
  },
]

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      className="group relative flex gap-5 sm:gap-8"
    >
      <div className="flex w-4 shrink-0 flex-col items-center">
        <div
          className="mt-[6px] h-3 w-3 shrink-0 transition-shadow duration-200"
          style={{ background: item.tone }}
          onMouseEnter={(event) => {
            event.currentTarget.style.boxShadow = `0 0 16px ${item.tone}`
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.boxShadow = 'none'
          }}
        />
        {index < timeline.length - 1 && (
          <div className="mt-2 w-px flex-1" style={{ background: 'var(--border)', minHeight: '32px' }} />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="truncate text-[15px] font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
              {item.role}
            </span>
            <span className="hidden text-xs sm:block" style={{ color: item.tone }}>
              /
            </span>
            <span className="truncate text-sm" style={{ color: 'var(--ink-3)' }}>
              {item.org}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {item.badge && (
              <span className="rounded-md border px-2 py-0.5 font-mono text-[10px]" style={item.badgeStyle ?? {}}>
                {item.badge}
              </span>
            )}
            <span className="font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
              {item.year}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <Section id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: 'var(--ink)' }}>
          Experience
        </h2>
      </div>

      <div className="max-w-2xl border px-5 py-5" style={{ borderColor: 'color-mix(in srgb, var(--accent) 14%, var(--border))' }}>
        {timeline.map((item, index) => (
          <TimelineItem key={`${item.role}-${item.year}`} item={item} index={index} />
        ))}
      </div>
    </Section>
  )
}
