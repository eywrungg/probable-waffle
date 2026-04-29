import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/achievements'

export default function AchievementsPage() {
  const [hero, ...rest] = achievements

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-28">
      <a href="/#other" className="inline-flex items-center gap-2 text-lg" style={{ color: 'var(--ink-2)' }}>
        <ArrowLeft size={20} />
        Back to home
      </a>

      <div className="mx-auto max-w-5xl py-14 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
          Milestones & Victories
        </p>
        <h1 className="mt-5 text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.92] tracking-tight" style={{ color: 'var(--ink)' }}>
          My <span style={{ color: 'var(--accent)' }}>Achievements</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed sm:text-[1.45rem]" style={{ color: 'var(--ink-3)' }}>
          From practical builds to leadership moments, each milestone reflects how I grow through real work and real collaboration.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <article
          className="overflow-hidden rounded-[2rem] border lg:col-span-12"
          style={{
            background: 'var(--card)',
            borderColor: 'rgba(255,255,255,0.07)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.95fr]">
            <div className="min-h-[28rem] border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <img src={hero.image} alt={hero.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-9">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.18em]" style={{ color: hero.accent }}>
                  {hero.eyebrow}
                </p>
                <h2 className="mt-5 text-[clamp(2.8rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-tight" style={{ color: 'var(--ink)' }}>
                  {hero.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed sm:text-[1.35rem]" style={{ color: 'var(--ink-2)' }}>
                  {hero.summary}
                </p>
              </div>
              <div className="mt-10">
                <p className="font-mono text-sm uppercase tracking-[0.16em]" style={{ color: 'var(--ink-4)' }}>
                  {hero.meta}
                </p>
              </div>
            </div>
          </div>
        </article>

        {rest.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.7rem] border lg:col-span-6"
            style={{
              background: 'var(--card)',
              borderColor: 'rgba(255,255,255,0.07)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-[15rem] sm:min-h-[18rem]">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: item.accent }}>
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 text-[2rem] font-semibold leading-[0.96] tracking-tight" style={{ color: 'var(--ink)' }}>
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {item.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-3)' }}>
                  {item.meta} <ArrowUpRight size={12} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
