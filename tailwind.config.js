/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        card:    'var(--card)',
        border:  'var(--border)',
        accent:  'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        ink:     'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        'nav-bg':'var(--nav-bg)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        'nav':    'var(--nav-shadow)',
        'card':   'var(--card-shadow)',
        'glow':   '0 0 40px -10px var(--accent-dim)',
      },
    },
  },
  plugins: [],
}
