import Section from '../components/Section'
import Tag from '../components/Tag'

const items = [
  {
    status: 'learning',
    title: 'WebGPU rendering pipeline',
    note: 'Working through the WebGPU spec and building a small particle renderer. The compute shader mental model is completely different from WebGL.',
    tags: ['WebGPU', 'WGSL', 'Canvas API'],
  },
  {
    status: 'shipped',
    title: 'Tilt-compensated compass',
    note: 'Fusing magnetometer + accelerometer data to get a stable heading even when the phone is tilted. Ended up as a core module in the AR project.',
    tags: ['React Native', 'expo-sensors', 'Linear Algebra'],
  },
  {
    status: 'exploring',
    title: 'Edge-first APIs with Cloudflare Workers',
    note: 'Experimenting with moving API logic to the edge. The latency improvements are real — the DX is still maturing.',
    tags: ['Cloudflare Workers', 'Hono', 'D1'],
  },
  {
    status: 'learning',
    title: 'Framer-style layout animations',
    note: 'Studying how Framer Motion\'s layout animation system works under the hood. Building small demos to understand FLIP technique.',
    tags: ['Motion', 'FLIP', 'CSS'],
  },
]

const badge: Record<string, string> = {
  learning:  'text-amber-400 border-amber-400/25 bg-amber-400/8',
  shipped:   'text-accent border-accent/25 bg-accent/8',
  exploring: 'text-blue-400 border-blue-400/25 bg-blue-400/8',
}

export default function Lab() {
  return (
    <Section id="lab" className="py-28 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight mb-2">
          Currently tinkering
        </h2>
        <p className="text-ink-3 text-sm max-w-md">
          Experiments, explorations, and things I'm learning. Not polished — that's the point.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="p-5 rounded-2xl border transition-colors duration-300"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--card-shadow)',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--ink-3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)')}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--ink)' }}>{item.title}</h3>
              <span
                className={`shrink-0 font-mono text-xs px-2 py-0.5 rounded-md border ${badge[item.status]}`}
              >
                {item.status}
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-3)' }}>{item.note}</p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => <Tag key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
