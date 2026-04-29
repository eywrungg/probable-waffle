import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import EmblaPortraitCarousel from '../components/EmblaPortraitCarousel'
import { BrandIcon } from '../lib/brandIcons'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type HoverImage = {
  id: string
  src: string
  label: string
  objectPosition?: string
  scale?: number
  filter?: string
}

const DEFAULT: HoverImage = {
  id: 'default',
  src: '/Photodefault.jpg',
  label: '',
  objectPosition: 'center 18%',
  scale: 1,
}

const INFO_PANEL_IMAGE: HoverImage = {
  id: 'info-panels',
  src: '/PHOTO.jpeg',
  label: '',
  objectPosition: 'center 18%',
  scale: 1.04,
  filter: 'brightness(0.94) contrast(1.02)',
}

const IMAGES: Record<number, HoverImage> = {
  0: DEFAULT,
  1: INFO_PANEL_IMAGE,
  2: INFO_PANEL_IMAGE,
  3: INFO_PANEL_IMAGE,
  4: {
    id: 'craft',
    src: '/PHOTO.jpeg',
    label: '',
    objectPosition: 'center 54%',
    scale: 1.08,
    filter: 'brightness(0.84) saturate(1.1)',
  },
  5: {
    id: 'location',
    src: '/PHOTO.jpeg',
    label: '',
    objectPosition: 'center 40%',
    scale: 1.05,
    filter: 'grayscale(0.15) brightness(0.88)',
  },
  6: {
    id: 'mindset',
    src: '/natures.jpg',
    label: '',
    objectPosition: 'center center',
    scale: 1.02,
  },
}

const CENTER_IMAGE_LAYERS = [DEFAULT, ...Object.values(IMAGES).filter((image) => image.id !== DEFAULT.id)]

const REAL_SLIDES = [
  { src: '/PHOTO.jpeg', alt: 'Explore', label: 'EXPLORE', objectPosition: 'center center' },
  { src: '/Hardwork.jpg', alt: 'Hard work', label: 'HARD WORK', objectPosition: 'center center' },
  { src: '/natures.jpg', alt: 'Nature', label: 'NATURE', objectPosition: 'center center' },
  { src: '/Mindset.JPG', alt: 'Mindset', label: 'MINDSET', objectPosition: 'center center' },
]

function Card({
  children,
  className = '',
  glow = false,
  delay = 0,
  style: styleProp,
  onHoverKey,
  hoverKey,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
  delay?: number
  style?: React.CSSProperties
  onHoverKey?: (k: number | null) => void
  hoverKey?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={`relative overflow-hidden rounded-2xl border p-6 ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: glow
          ? 'var(--card-shadow), 0 0 48px -14px var(--accent-dim)'
          : 'var(--card-shadow)',
        transition: 'border-color 0.25s ease, transform 0.2s ease',
        ...styleProp,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ink-4)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        onHoverKey?.(hoverKey ?? null)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        onHoverKey?.(null)
      }}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            opacity: 0.12,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

const HOVER_ITEMS = [
  {
    title: 'Science Club',
    text: "Active IT club member at St. Mary's College. Building campus navigation apps, AR systems, and embedded hardware.",
    key: 1,
  },
  {
    title: 'University',
    text: "BS Information Technology student at St. Mary's College of Bansalan, Davao del Sur - bridging software and hardware.",
    key: 2,
  },
  {
    title: 'Competitions',
    text: 'Undergraduate researcher and capstone lead. Built PyroWatch fire suppression controller and Campus AR Navigation app.',
    key: 3,
  },
] as const

const PANEL_HEIGHTS = [112, 146, 112] as const
const PANEL_LAYOUTS = [
  { left: '0%', width: '35%' },
  { left: '31%', width: '39%' },
  { left: '69%', width: '31%' },
] as const
const PANEL_ROTATIONS = [-1.1, 0, 1.1] as const
const PANEL_TEXT_ALIGN = ['left', 'center', 'right'] as const

function HoverCarousel({ onHover }: { onHover: (k: number | null) => void }) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            opacity: hovered ? 0 : 1,
            transition: 'opacity 0.25s ease',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-4)',
            fontFamily: 'monospace',
          }}
        >
          Hover to read more
        </span>
      </div>

      <div
        className="relative mt-3 h-[124px] overflow-hidden rounded-[18px] sm:mt-[14px] sm:h-[138px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setActive(null)
          onHover(null)
        }}
      >
        {HOVER_ITEMS.map((item, i) => {
          const isActive = active === i
          const height = PANEL_HEIGHTS[i]
          const layout = PANEL_LAYOUTS[i]
          const translateY = isActive ? 0 : 42
          const rotation = isActive ? PANEL_ROTATIONS[i] : 0
          const zIndex = isActive ? 4 : active === null ? i + 1 : 1
          const textAlign = PANEL_TEXT_ALIGN[i]

          return (
            <div
              key={item.title}
              onMouseEnter={() => {
                setActive(i)
                onHover(item.key)
              }}
              onMouseLeave={() => {
                setActive(null)
                onHover(null)
              }}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                position: 'absolute',
                left: layout.left,
                bottom: -14,
                width: layout.width,
                height,
                padding: '16px 18px 14px',
                background: 'var(--surface)',
                borderRadius: 18,
                border: `1px solid ${isActive ? 'color-mix(in srgb, var(--accent) 38%, var(--border))' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive
                  ? '0 18px 40px rgba(0,0,0,0.34), 0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent), 0 0 26px color-mix(in srgb, var(--accent) 12%, transparent)'
                  : '0 10px 24px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
                transition: 'transform 0.38s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                transformOrigin:
                  i === 0 ? 'bottom left' : i === 2 ? 'bottom right' : 'bottom center',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                zIndex,
                textAlign,
              }}
            >
              <p
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--ink)' : 'var(--ink-3)',
                  margin: '0 0 9px 0',
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: 10.8,
                  color: 'var(--ink-2)',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AccentRule() {
  return (
    <span
      aria-hidden
      className="mb-4 block h-[2px] w-10 rounded-full"
      style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
    />
  )
}

const TECH_ITEMS = [
  { name: 'React Native' },
  { name: 'TypeScript' },
  { name: 'Expo' },
  { name: 'Node.js' },
  { name: 'Tailwind' },
  { name: 'Docker' },
  { name: 'Git' },
  { name: 'Unity' },
  { name: 'ESP32' },
]

const PILL_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 14px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.08)',
  whiteSpace: 'nowrap',
  fontSize: 12,
  color: 'var(--ink-2)',
}

function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div className="relative overflow-hidden py-1">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8" style={{ background: 'linear-gradient(to right, var(--card), transparent)' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8" style={{ background: 'linear-gradient(to left, var(--card), transparent)' }} />
      <div
        ref={trackRef}
        className="flex w-max items-center gap-2"
        style={{ animation: 'marquee 28s linear infinite' }}
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
        }}
      >
        {doubled.map((tech, idx) => (
          <span key={`${tech.name}-${idx}`} style={PILL_STYLE}>
            <BrandIcon label={tech.name} size={16} />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const [hoverKey, setHoverKey] = useState<number | null>(null)
  const activeImg = hoverKey !== null ? (IMAGES[hoverKey] ?? DEFAULT) : DEFAULT

  return (
    <section id="about" className="mx-auto max-w-5xl px-5 pb-10 pt-16">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-12">
        <Card
          className="order-1 col-span-1 flex min-h-[115px] flex-col items-center justify-center text-center lg:col-span-4 lg:order-1"
          delay={0}
          hoverKey={0}
          onHoverKey={setHoverKey}
        >
          <h2
            className="font-bold uppercase leading-[0.95] tracking-tight"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}
          >
            Charles
            <br />
            Alcebar
          </h2>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--ink-4)' }}>
            Fullstack Developer
          </p>
        </Card>

        <div
          className="contents lg:order-4 lg:col-span-4 lg:flex lg:flex-col lg:gap-3 lg:self-stretch"
          style={{ minHeight: 0 }}
        >
          <Card
            className="order-2 col-span-1 h-[208px] overflow-hidden p-0 sm:h-[244px] lg:order-none lg:h-[322px] lg:w-full"
            style={{ padding: 0 }}
            delay={0.14}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #263238, #0b0f16)' }} />
              {CENTER_IMAGE_LAYERS.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                  style={{
                    opacity: activeImg.id === image.id ? 1 : 0,
                    transition: 'opacity 0.45s ease, transform 0.45s ease, filter 0.45s ease',
                    pointerEvents: 'none',
                    objectPosition: image.objectPosition ?? 'center center',
                    transform: `scale(${image.scale ?? 1})`,
                    filter: image.filter ?? 'none',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ))}
            </div>
          </Card>

          <Card
            className="order-5 col-span-1 flex flex-col justify-between self-start overflow-hidden lg:order-none lg:min-h-[112px] lg:self-stretch"
            delay={0.16}
            style={{ padding: 0 }}
            hoverKey={5}
            onHoverKey={setHoverKey}
          >
            <div className="absolute inset-0" aria-hidden>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 12%, rgba(255,255,255,0.18), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                }}
              />
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
                <defs>
                  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="grid2" width="140" height="140" patternUnits="userSpaceOnUse">
                    <rect width="140" height="140" fill="url(#grid)" />
                    <path d="M 140 0 L 0 0 0 140" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
                <path d="M 20 60 Q 60 40 100 55 Q 140 70 180 50" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path d="M 0 90 Q 50 80 90 95 Q 130 110 200 85" stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.4" />
                <ellipse cx="90" cy="75" rx="35" ry="22" fill="var(--accent)" opacity="0.06" />
              </svg>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
                  opacity: 0.55,
                  animation: 'scanline 3s linear infinite',
                  boxShadow: '0 0 8px 2px var(--accent-dim)',
                }}
              />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-3 pt-3 sm:px-5">
              <h4
                className="font-semibold uppercase leading-none tracking-tight"
                style={{ color: 'var(--ink)', fontSize: 'clamp(1rem, 1.9vw, 1.45rem)' }}
              >
                Union, Bansalan
              </h4>
              <p className="mt-1 font-mono text-[10px] sm:text-[11px]" style={{ color: 'var(--ink-3)' }}>
                6.77 deg N, 125.22 deg E
              </p>
              <p className="mt-0.5 font-mono text-[10px] sm:text-[11px]" style={{ color: 'var(--accent)' }}>
                GMT+8 / Asia/Manila
              </p>
            </div>
          </Card>
        </div>

        <Card
          className="order-3 col-span-2 p-3 sm:px-3 sm:pb-0 sm:pt-2 lg:order-2 lg:col-span-8"
          delay={0.05}
        >
          <HoverCarousel onHover={setHoverKey} />
        </Card>

        <Card
          className="order-4 col-span-1 row-span-2 flex h-full min-h-[360px] flex-col lg:order-6 lg:col-span-4 lg:row-span-1 lg:min-h-[294px]"
          glow
          delay={0.2}
          hoverKey={4}
          onHoverKey={setHoverKey}
          style={{ padding: '1.25rem 1.1rem 1rem' }}
        >
          <h3 className="text-[1.55rem] font-semibold leading-[0.95] sm:text-[1.85rem]">Craft</h3>
          <AccentRule />
          <p className="mb-3 max-w-[17ch] text-[0.95rem] font-semibold leading-[1.28] sm:max-w-[18ch] sm:text-[1.02rem]" style={{ color: 'var(--ink)' }}>
            Building scalable apps, websites, and automations.
          </p>
          <p className="text-[0.88rem] font-medium leading-[1.45] sm:hidden" style={{ color: 'var(--ink-2)' }}>
            I help shape practical tech solutions that match what a business actually needs.
          </p>
          <p className="hidden max-w-[21ch] text-[0.96rem] font-medium leading-[1.45] sm:block" style={{ color: 'var(--ink-2)' }}>
            I understand what advantages modern tech can provide, helping me advise on the solutions a business actually needs.
          </p>
          <div className="mt-3 sm:mt-4">
            <TechMarquee />
          </div>
          <p className="mb-3 mt-3 text-[0.82rem] leading-[1.45] sm:mt-auto sm:text-[0.92rem]" style={{ color: 'var(--ink-2)' }}>
            Active hackathon competitor and science club member.
          </p>
          <Button href="#contact" variant="outline" className="h-8 self-start px-4 text-xs sm:h-7 sm:px-3 sm:text-[11px]">
            Invite me to collaborate <ArrowRight size={12} />
          </Button>
        </Card>

        <Card
          className="order-6 col-span-1 flex flex-col self-start lg:order-3 lg:col-span-4"
          delay={0.1}
          hoverKey={6}
          onHoverKey={setHoverKey}
          style={{ padding: '1.25rem 1.1rem 1rem' }}
        >
          <h3 className="text-[1.55rem] font-semibold leading-[0.95] sm:text-[1.85rem]">Mindset</h3>
          <AccentRule />
          <p className="mb-2 max-w-[18ch] text-[0.95rem] font-semibold leading-[1.28] sm:text-[1.02rem]" style={{ color: 'var(--ink)' }}>
            Building more than software.
          </p>
          <p className="max-w-[24ch] text-[0.88rem] font-medium leading-[1.45] sm:max-w-[21ch] sm:text-[0.96rem]" style={{ color: 'var(--ink-2)' }}>
            My passions provide the discipline and focus I need to grow.
          </p>
          <div className="mt-3 sm:mt-2">
            <EmblaPortraitCarousel slides={REAL_SLIDES} options={{ loop: true }} />
          </div>
          <p className="mt-3 text-[0.82rem] leading-[1.45] sm:text-[0.92rem]" style={{ color: 'var(--ink-2)' }}>
            Mastering body and mind is my path to excellence.
          </p>
        </Card>
      </div>
    </section>
  )
}
