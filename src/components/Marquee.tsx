import { useRef } from 'react'

const ITEMS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite',
  'React Native', 'Node.js', 'PostgreSQL', 'Unity', 'Supabase',
  'Figma', 'Git', 'REST APIs', 'AR Navigation', 'Expo',
  'A* Pathfinding', 'WebGPU', 'Cloudflare Workers', 'Hono',
]

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full overflow-hidden py-6 select-none" aria-hidden>
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-3 w-max"
        style={{ animation: 'marquee 40s linear infinite' }}
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs px-3 py-1.5 rounded-pill border whitespace-nowrap"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--card)',
              color: 'var(--ink-3)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
