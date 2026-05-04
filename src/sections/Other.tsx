import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpenText,
  Camera,
  ChevronRight,
  Clapperboard,
  PenTool,
} from 'lucide-react'
import Section from '../components/Section'
import { withBase } from '../lib/paths'

function Card({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <article
      className={`rounded-[1.8rem] border ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: 'rgba(255,255,255,0.07)',
        boxShadow: 'var(--card-shadow)',
        ...style,
      }}
    >
      {children}
    </article>
  )
}

const creativeSkills = [
  {
    label: 'Poster editing',
    description: 'Event posters, visual layouts, and bold social-ready graphics.',
    icon: PenTool,
  },
  {
    label: 'Video editing',
    description: 'Short-form edits, pacing, cuts, and clean presentation reels.',
    icon: Clapperboard,
  },
  {
    label: 'Photography',
    description: 'Shot framing, photo selection, and visual storytelling for projects.',
    icon: Camera,
  },
] as const

const panelHeights = [112, 146, 112] as const
const panelLayouts = [
  { left: '0%', width: '35%' },
  { left: '31%', width: '39%' },
  { left: '69%', width: '31%' },
] as const
const panelRotations = [-1.1, 0, 1.1] as const
const panelTextAlign = ['left', 'center', 'right'] as const

function CreativeStack() {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className="relative mt-5 overflow-hidden rounded-[1.45rem]"
      style={{
        height: 160,
        background:
          'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 38%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setActive(null)
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center pt-3"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity duration-200"
          style={{ color: 'var(--ink-4)', opacity: hovered ? 0 : 1 }}
        >
          Hover to read more
        </span>
      </div>

      {creativeSkills.map((skill, index) => {
        const isActive = active === index
        const layout = panelLayouts[index]
        const translateY = isActive ? 0 : 42
        const rotation = isActive ? panelRotations[index] : 0
        const zIndex = isActive ? 4 : active === null ? index + 1 : 1
        const textAlign = panelTextAlign[index]

        return (
          <div
            key={skill.label}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(active === index ? null : index)}
            tabIndex={0}
            className="absolute bottom-[-14px] outline-none"
            style={{
              left: layout.left,
              width: layout.width,
              height: panelHeights[index],
              padding: '16px 18px 14px',
              background: 'var(--surface)',
              borderRadius: 18,
              border: `1px solid ${
                isActive
                  ? 'color-mix(in srgb, var(--accent) 38%, var(--border))'
                  : 'rgba(255,255,255,0.08)'
              }`,
              boxShadow: isActive
                ? '0 18px 40px rgba(0,0,0,0.34), 0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent), 0 0 26px color-mix(in srgb, var(--accent) 12%, transparent)'
                : '0 10px 24px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
              transition: 'transform 0.38s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              transformOrigin:
                index === 0 ? 'bottom left' : index === 2 ? 'bottom right' : 'bottom center',
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              zIndex,
              textAlign,
            }}
          >
            <p
              className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]"
              style={{
                color: isActive ? 'var(--ink)' : 'var(--ink-3)',
                margin: '0 0 9px 0',
              }}
            >
              {skill.label}
            </p>
            <p
              className="text-[10.8px] leading-[1.45]"
              style={{ color: 'var(--ink-2)', margin: 0 }}
            >
              {skill.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.024 4.388 11.018 10.125 11.927v-8.438H7.078v-3.489h3.047V9.41c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.963H15.83c-1.49 0-1.955.931-1.955 1.887v2.264h3.328l-.532 3.489h-2.796V24C19.612 23.091 24 18.097 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8A3.2 3.2 0 1015.2 12 3.2 3.2 0 0012 8.8z" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/charles0202/',
    icon: LinkedinIcon,
    note: 'Professional profile',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/eywrungg',
    icon: GithubIcon,
    note: 'Projects and code',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1CYejf3vde/?mibextid=wwXIfr',
    icon: FacebookIcon,
    note: 'Connect on Facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ei.ronn?igsh=MWZ0cW1tdGFldnIybg%3D%3D&utm_source=qr',
    icon: InstagramIcon,
    note: 'Follow on Instagram',
  },
] as const

function SocialTile({
  label,
  href,
  note,
  icon: Icon,
}: {
  label: string
  href: string
  note: string
  icon: ({ size }: { size?: number }) => JSX.Element
}) {
  const content = (
    <div
      className="flex items-center justify-between rounded-[1.15rem] border px-4 py-4 transition-[transform,border-color,background-color] duration-300"
      style={{
        background: 'var(--surface)',
        borderColor: 'rgba(255,255,255,0.06)',
        color: 'var(--ink)',
      }}
    >
      <span className="inline-flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <Icon size={16} />
        </span>
        <span>
          <span className="block text-sm font-medium">{label}</span>
          <span className="block text-xs" style={{ color: 'var(--ink-3)' }}>
            {note}
          </span>
        </span>
      </span>
      <ArrowUpRight size={14} style={{ color: href ? 'var(--ink)' : 'var(--ink-4)' }} />
    </div>
  )

  if (!href) {
    return (
      <div className="opacity-80" title={`${label} link not added yet`}>
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform duration-300 hover:-translate-y-1"
    >
      {content}
    </a>
  )
}

export default function Other() {
  return (
    <Section id="other" className="mx-auto max-w-5xl px-6 py-28">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: 'var(--ink)' }}
        >
          Beyond the build
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed sm:text-[0.98rem]"
          style={{ color: 'var(--ink-3)' }}
        >
          The quieter side of the portfolio: milestones, community, and the people
          passing through the work.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="group relative overflow-hidden p-5 sm:p-6 lg:col-span-6">
          <a href={withBase('/achievements')} className="relative block">
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-2.5rem] top-[-3rem] h-40 w-40 rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{
                background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 68%)',
              }}
            />
            <div className="relative">
              <div
                className="rounded-[1.45rem] border px-5 py-6 text-center transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, transparent), color-mix(in srgb, var(--accent) 2%, transparent) 36%, var(--surface))',
                  borderColor: 'color-mix(in srgb, var(--accent) 24%, transparent)',
                  boxShadow: '0 0 28px color-mix(in srgb, var(--accent) 8%, transparent)',
                }}
              >
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent)' }}
                >
                  Milestones and victories
                </p>
                <h4
                  className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[0.95] tracking-tight"
                  style={{ color: 'var(--ink)' }}
                >
                  View My <span style={{ color: 'var(--accent)' }}>Achievements</span>
                </h4>
                <p
                  className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed"
                  style={{ color: 'var(--ink-2)' }}
                >
                  A dedicated page for the wins, experiments, and hard-earned progress behind the portfolio.
                </p>
              </div>

              <div
                className="mt-4 inline-flex items-center gap-2 font-medium transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'var(--ink)' }}
              >
                Open achievements <ArrowUpRight size={14} />
              </div>
            </div>
          </a>
        </Card>

        <Card className="group relative overflow-hidden p-5 sm:p-6 lg:col-span-6">
          <a href={withBase('/guestbook')} className="block">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%), linear-gradient(180deg, color-mix(in srgb, var(--accent) 7%, transparent), transparent 45%)',
              }}
            />
            <div className="relative">
              <div
                className="rounded-[1.45rem] border px-5 py-6 text-center transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 10%, transparent), var(--surface))',
                  borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                  boxShadow: '0 0 28px color-mix(in srgb, var(--accent) 10%, transparent)',
                }}
              >
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent)' }}
                >
                  Community wall
                </p>
                <h4
                  className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[0.95] tracking-tight"
                  style={{ color: 'var(--ink)' }}
                >
                  Leave Your <span style={{ color: 'var(--accent)' }}>Mark</span>
                </h4>
                <p
                  className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed"
                  style={{ color: 'var(--ink-2)' }}
                >
                  Notes, feedback, and small messages that stay pinned to the portfolio wall.
                </p>
              </div>

              <div
                className="mt-4 inline-flex items-center gap-2 font-medium transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'var(--ink)' }}
              >
                Open guestbook <ArrowUpRight size={14} />
              </div>
            </div>
          </a>
        </Card>

        <Card className="relative overflow-hidden p-5 sm:p-6 lg:col-span-7">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent), transparent 68%)',
            }}
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3
                className="text-[1.3rem] font-semibold tracking-tight"
                style={{ color: 'var(--ink)' }}
              >
                Creative skills
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                Posters, video edits, photography, and the visual polish around my builds.
              </p>
            </div>

            <a
              href={withBase('/blog')}
              className="group/blog flex shrink-0 items-center justify-between gap-6 rounded-[1.1rem] border px-4 py-3 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: '#050505',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#f7f7f7',
                boxShadow: '0 16px 36px rgba(0,0,0,0.26)',
              }}
            >
              <span className="inline-flex items-center gap-3 whitespace-nowrap">
                <BookOpenText size={17} />
                Read my blog
              </span>
              <ChevronRight
                size={18}
                className="transition-transform duration-300 group-hover/blog:translate-x-1"
              />
            </a>
          </div>

          <CreativeStack />
        </Card>

        <Card className="p-5 sm:p-6 lg:col-span-5">
          <h3
            className="text-[1.3rem] font-semibold tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            Social links
          </h3>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            The usual places to find my work and reach out online.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {socialLinks.map((item) => (
              <SocialTile key={item.label} {...item} />
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}
