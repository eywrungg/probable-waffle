import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import Section from '../components/Section'
import { withBase } from '../lib/paths'

const posts = [
  {
    date: 'Apr 2026',
    title: 'Designing Bento Interfaces Without Losing Personality',
    excerpt: 'How I keep dense portfolio layouts clear, responsive, and still human.',
    read: '6 min read',
  },
  {
    date: 'Mar 2026',
    title: 'From Idea to Shippable Project in 7 Nights',
    excerpt: 'A practical sprint system for solo developers building portfolio-grade work.',
    read: '8 min read',
  },
  {
    date: 'Feb 2026',
    title: 'Making AR Projects Feel Practical, Not Gimmicky',
    excerpt: 'Lessons from building student-friendly augmented reality experiences.',
    read: '5 min read',
  },
]

export default function Blog() {
  return (
    <Section id="blog" className="py-28 px-6 max-w-5xl mx-auto">
      <a href={withBase('/#other')} className="mb-10 inline-flex items-center gap-2 text-lg" style={{ color: 'var(--ink-2)' }}>
        <ArrowLeft size={20} />
        Back to home
      </a>

      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2" style={{ color: 'var(--ink)' }}>
            Blog
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--ink-3)' }}>
            Notes on engineering, process, and the tiny details that make products feel premium.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-2xl border p-5 transition-colors"
            style={{ background: 'var(--card)', borderColor: 'var(--border)', boxShadow: 'var(--card-shadow)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ink-4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>
              {post.date}
            </p>
            <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: 'var(--ink)' }}>
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
                <Clock3 size={12} />
                {post.read}
              </span>
              <a href="#" className="text-xs inline-flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                Read <ArrowUpRight size={12} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
