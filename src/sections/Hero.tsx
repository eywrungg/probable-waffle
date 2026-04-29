import { motion } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '../components/Button'

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden">

      {/* ── Vertical name sidebar ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className="hidden lg:flex flex-col items-center justify-between py-10 pl-6 pr-4 shrink-0 select-none"
        aria-hidden
      >
        {/* Top: rotated full name */}
        <div
          className="font-mono text-[10px] tracking-[0.25em] text-ink-4 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Charles Arone Alcebar
        </div>

        {/* Bottom: year */}
        <div
          className="font-mono text-[10px] tracking-[0.2em] text-ink-4"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          © {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* ── Thin vertical rule ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="hidden lg:block w-px bg-border self-stretch origin-top shrink-0"
      />

      {/* ── Main hero content ── */}
      <div className="relative flex flex-col justify-center px-8 sm:px-12 max-w-4xl pt-28 pb-20 flex-1 overflow-hidden">

        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[1.02] tracking-tightest text-ink mb-4 text-balance"
          >
            Charles Arone<br />
            <span className="text-ink-3">Alcebar</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-ink-2 font-light mb-4 max-w-lg leading-relaxed"
          >
            Frontend Developer &amp; UI Engineer
          </motion.p>

          {/* Value prop */}
          <motion.p
            variants={item}
            className="text-ink-3 max-w-md mb-10 leading-relaxed text-[15px]"
          >
            I build digital products that feel as good as they perform — precise interfaces,
            thoughtful interactions, and code that scales. Currently focused on React, TypeScript,
            and AR/mobile experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View Projects
              <ArrowRight size={14} />
            </Button>
            <Button href="https://github.com/eywrungg" external variant="outline">
              <GithubIcon />
              GitHub
            </Button>
            <Button href="#contact" variant="ghost">
              Contact
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 right-8 hidden md:flex items-center gap-2 text-ink-4"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            <ArrowDown size={13} />
          </motion.div>
          <span className="font-mono text-xs tracking-widest">scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
