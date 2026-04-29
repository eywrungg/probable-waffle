import { ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'

const EMAIL = 'charlesarone@example.com'

const marqueeItems = [
  'Union, Bansalan',
  'Charles Arone Alcebar',
  'Fullstack Developer',
  'Creative Builder',
]

export default function Contact() {
  return (
    <Section id="contact" className="px-0 pb-12 pt-0">
      <div
        className="px-6 py-24 text-center sm:py-28"
        style={{ background: 'var(--accent)', color: '#050505' }}
      >
        <h2
          className="mx-auto max-w-4xl text-4xl uppercase leading-[1.05] tracking-normal sm:text-5xl md:text-7xl"
          style={{ fontFamily: '"Archivo Black", "Space Grotesk", sans-serif' }}
        >
          Let's build something great
        </h2>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center border px-8 py-4 text-base font-black uppercase"
            style={{ background: '#050505', borderColor: '#050505', color: '#fff' }}
          >
            Get in touch
          </a>
          <a
            href="https://github.com/eywrungg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border px-8 py-4 text-base font-black uppercase"
            style={{ borderColor: '#050505', color: '#050505' }}
          >
            View GitHub
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="overflow-hidden py-7" style={{ background: '#050505' }}>
        <div
          className="flex w-max items-center gap-6"
          style={{ animation: 'marquee 24s linear infinite' }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-3xl font-black uppercase tracking-normal opacity-20 sm:text-4xl"
              style={{
                color: '#fff',
                fontFamily: '"Archivo Black", "Space Grotesk", sans-serif',
              }}
            >
              {item} *
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
