import { useEffect, useRef, useState } from 'react'
import Section from '../components/Section'
import { BrandIcon } from '../lib/brandIcons'

const groups = [
  {
    title: 'Languages',
    items: [
      { label: 'JavaScript', mark: 'JS', color: '#f7df1e' },
      { label: 'TypeScript', mark: 'TS', color: '#3178c6' },
      { label: 'HTML5', mark: 'H5', color: '#e34f26' },
      { label: 'CSS3', mark: 'C3', color: '#1572b6' },
      { label: 'PHP', mark: 'PHP', color: '#777bb4' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { label: 'React', mark: 'R', color: '#61dafb' },
      { label: 'Laravel', mark: 'L', color: '#ff2d20' },
      { label: 'Blade', mark: 'B', color: '#f97316' },
      { label: 'Vue.js', mark: 'V', color: '#42b883' },
      { label: 'Tailwind', mark: 'TW', color: '#06b6d4' },
      { label: 'React Native', mark: 'RN', color: '#61dafb' },
    ],
  },
  {
    title: 'State & Data',
    items: [
      { label: 'Supabase', mark: 'SB', color: '#3ecf8e' },
      { label: 'MySQL', mark: 'DB', color: '#4479a1' },
      { label: 'REST API', mark: 'API', color: '#a855f7' },
      { label: 'Axios', mark: 'AX', color: '#5a29e4' },
    ],
  },
  {
    title: 'Tools & Testing',
    items: [
      { label: 'Git', mark: 'G', color: '#f05032' },
      { label: 'Vite', mark: 'V', color: '#646cff' },
      { label: 'NPM', mark: 'N', color: '#cb3837' },
      { label: 'Playwright', mark: 'PW', color: '#45ba4b' },
      { label: 'VS Code', mark: 'VS', color: '#007acc' },
      { label: 'Unity', mark: 'U', color: '#ffffff', bg: '#111111' },
    ],
  },
] as const

const creativeTools = [
  { label: 'CapCut', mark: 'CC', color: '#ffffff', bg: '#050505' },
  { label: 'Alight Motion', mark: 'AM', color: '#8cff4d', bg: '#102414' },
  { label: 'After Effects', mark: 'Ae', color: '#d8b4fe', bg: '#1e1240' },
  { label: 'Photoshop', mark: 'Ps', color: '#31a8ff', bg: '#001e36' },
  { label: 'Premiere Pro', mark: 'Pr', color: '#ea77ff', bg: '#2a0f3f' },
  { label: 'Lightroom', mark: 'Lr', color: '#31d7ff', bg: '#001e36' },
] as const

const experience = [
  { title: 'Fullstack Developer', detail: 'Laravel, React, APIs, and polished product UI', year: '2026', tone: '#c96a3b' },
  { title: 'Creative Editor', detail: 'Posters, video editing, photography, and reels', year: '2025', tone: '#8f5f78' },
  { title: 'Capstone Lead', detail: 'Research, product delivery, and system design', year: '2025', tone: '#4b7496' },
  { title: 'Hackathon Builder', detail: 'Fast prototypes under pressure', year: '2024', tone: '#7256c7' },
  { title: 'BS Information Technology', detail: "St. Mary's College of Bansalan", year: '2023', tone: '#5f9074' },
  { title: 'Hello World!', detail: 'Wrote my first serious line of code', year: '2021', tone: '#b88a42' },
] as const

function SkillMark({ item }: { item: { label: string; mark: string; color: string; bg?: string } }) {
  return (
    <span className="flex h-10 min-w-10 items-center justify-center px-1">
      <BrandIcon label={item.label} size={21} />
    </span>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeExperience, setActiveExperience] = useState(0)

  useEffect(() => {
    const updateActiveExperience = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight
      const scrollable = Math.max(1, rect.height - viewport * 0.45)
      const progress = Math.min(Math.max((viewport * 0.28 - rect.top) / scrollable, 0), 1)
      setActiveExperience(Math.round(progress * (experience.length - 1)))
    }

    updateActiveExperience()
    window.addEventListener('scroll', updateActiveExperience, { passive: true })
    window.addEventListener('resize', updateActiveExperience)
    return () => {
      window.removeEventListener('scroll', updateActiveExperience)
      window.removeEventListener('resize', updateActiveExperience)
    }
  }, [])

  return (
    <Section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <div ref={sectionRef} className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <div className="mb-14">
            <p
              className="font-mono text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'var(--accent)' }}
            >
              Technologies
            </p>
            <h2
              className="mt-5 text-6xl leading-none tracking-normal sm:text-7xl"
              style={{
                color: 'var(--ink)',
                fontFamily: '"Archivo Black", "Space Grotesk", sans-serif',
              }}
            >
              Stack & Code
            </h2>
          </div>

          <div>
            {groups.map((group, index) => (
              <div
                key={group.title}
                className="border-t py-9 first:border-t-0 first:pt-0"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <h3
                  className="text-3xl uppercase leading-none tracking-normal sm:text-4xl"
                  style={{
                    color: 'var(--accent)',
                    fontFamily: '"Archivo Black", "Space Grotesk", sans-serif',
                  }}
                >
                  {group.title}
                </h3>

                <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <SkillMark item={item} />
                      <span
                        className="font-mono text-xs uppercase tracking-[0.08em]"
                        style={{ color: index === 0 ? 'var(--ink-2)' : 'var(--ink-3)' }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t py-9" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3
                className="text-3xl uppercase leading-none tracking-normal sm:text-4xl"
                style={{
                  color: 'var(--accent)',
                  fontFamily: '"Archivo Black", "Space Grotesk", sans-serif',
                }}
              >
                Creative Tools
              </h3>

              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5">
                {creativeTools.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <SkillMark item={item} />
                    <span
                      className="font-mono text-xs uppercase tracking-[0.08em]"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside
          className="relative overflow-hidden border px-5 py-6 lg:sticky lg:top-24"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--card) 90%, white 10%), color-mix(in srgb, var(--surface) 94%, transparent))',
            borderColor: 'color-mix(in srgb, var(--accent) 14%, var(--border))',
            boxShadow: '0 24px 60px color-mix(in srgb, black 16%, transparent)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28"
            style={{
              background:
                'radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 56%), linear-gradient(90deg, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px)',
              backgroundSize: 'auto, 28px 28px',
              opacity: 0.7,
            }}
          />
          <h3
            className="relative text-2xl font-black tracking-normal"
            style={{ color: 'var(--ink)', fontFamily: '"Archivo Black", "Space Grotesk", sans-serif' }}
          >
            Experience
          </h3>

          <div className="relative mt-7 space-y-6">
            <span
              aria-hidden
              className="absolute bottom-2 left-[8px] top-2 w-px"
              style={{ background: 'color-mix(in srgb, var(--ink) 12%, transparent)' }}
            />
            {experience.map((item, index) => {
              const isActive = activeExperience === index
              return (
                <div
                  key={`${item.title}-${item.year}`}
                  className="relative grid grid-cols-[1.25rem_1fr_auto] gap-3 py-3 transition-all duration-300"
                  style={{
                    background: 'transparent',
                    border: 'none',
                  }}
                >
                  <span
                    className="mt-1 h-4 w-4"
                    style={{
                      background: isActive ? item.tone : 'color-mix(in srgb, var(--ink) 14%, transparent)',
                      boxShadow: isActive ? `0 0 18px color-mix(in srgb, ${item.tone} 28%, transparent)` : 'none',
                    }}
                  />
                  <div>
                    <p className="text-[1.05rem] font-black leading-tight" style={{ color: 'var(--ink)' }}>
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-snug" style={{ color: 'var(--ink-2)' }}>
                      {item.detail}
                    </p>
                  </div>
                  <span
                    className="self-center font-mono text-xs font-bold transition-colors duration-300"
                    style={{ color: isActive ? item.tone : 'var(--ink-3)' }}
                  >
                    {item.year}
                  </span>
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </Section>
  )
}
