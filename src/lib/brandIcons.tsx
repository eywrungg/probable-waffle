import type { CSSProperties } from 'react'
import type { SimpleIcon } from 'simple-icons'
import {
  siAxios,
  siC,
  siCplusplus,
  siCss,
  siDocker,
  siEspressif,
  siExpo,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNodedotjs,
  siNpm,
  siPhp,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUnity,
  siVite,
  siVuedotjs,
} from 'simple-icons'

type BrandDefinition = {
  icon?: SimpleIcon
  fallback: string
  bg?: string
  fg?: string
}

const BRAND_DEFINITIONS: Record<string, BrandDefinition> = {
  JavaScript: { icon: siJavascript, fallback: 'JS' },
  TypeScript: { icon: siTypescript, fallback: 'TS' },
  HTML5: { icon: siHtml5, fallback: 'H5' },
  CSS3: { icon: siCss, fallback: 'C3' },
  PHP: { icon: siPhp, fallback: 'PHP' },
  'C++': { icon: siCplusplus, fallback: 'C++' },
  C: { icon: siC, fallback: 'C' },
  Python: { icon: siPython, fallback: 'PY' },
  React: { icon: siReact, fallback: 'R' },
  'React Native': { icon: siReact, fallback: 'RN' },
  Laravel: { icon: siLaravel, fallback: 'L' },
  Blade: { fallback: 'B', fg: '#f97316' },
  'Vue.js': { icon: siVuedotjs, fallback: 'V' },
  Tailwind: { icon: siTailwindcss, fallback: 'TW' },
  'Tailwind CSS': { icon: siTailwindcss, fallback: 'TW' },
  Supabase: { icon: siSupabase, fallback: 'SB' },
  MySQL: { icon: siMysql, fallback: 'DB' },
  'REST API': { fallback: 'API', fg: '#a855f7' },
  Axios: { icon: siAxios, fallback: 'AX' },
  Git: { icon: siGit, fallback: 'G' },
  Vite: { icon: siVite, fallback: 'V' },
  NPM: { icon: siNpm, fallback: 'N' },
  Playwright: { fallback: 'PW', fg: '#45ba4b' },
  'VS Code': { fallback: 'VS', fg: '#007acc' },
  Unity: { icon: siUnity, fallback: 'U', bg: '#111111' },
  ARCore: { fallback: 'AR', fg: '#4285f4' },
  ARKit: { fallback: 'AK', fg: '#f5f5f7' },
  ViroReact: { fallback: 'VR', fg: '#61dafb' },
  Expo: { icon: siExpo, fallback: 'EX', bg: '#111111' },
  'Node.js': { icon: siNodedotjs, fallback: 'N' },
  Docker: { icon: siDocker, fallback: 'DK' },
  ESP32: { icon: siEspressif, fallback: 'ESP' },
  CapCut: { fallback: 'CC', bg: '#050505', fg: '#ffffff' },
  'Alight Motion': { fallback: 'AM', bg: '#102414', fg: '#8cff4d' },
  'After Effects': { fallback: 'Ae', bg: '#1e1240', fg: '#d8b4fe' },
  Photoshop: { fallback: 'Ps', bg: '#001e36', fg: '#31a8ff' },
  'Premiere Pro': { fallback: 'Pr', bg: '#2a0f3f', fg: '#ea77ff' },
  Lightroom: { fallback: 'Lr', bg: '#001e36', fg: '#31d7ff' },
}

function trimLabel(label: string) {
  return label.slice(0, label.length > 3 ? 2 : 3).toUpperCase()
}

export function getBrandDefinition(label: string) {
  return BRAND_DEFINITIONS[label]
}

export function getBrandAccent(label: string, fallback: string) {
  const definition = getBrandDefinition(label)
  if (definition?.icon) return `#${definition.icon.hex}`
  return definition?.fg ?? fallback
}

export function getBrandBackground(label: string, fallback = 'transparent') {
  return getBrandDefinition(label)?.bg ?? fallback
}

export function BrandIcon({
  label,
  size = 18,
  style,
}: {
  label: string
  size?: number
  style?: CSSProperties
}) {
  const definition = getBrandDefinition(label)

  if (definition?.icon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden
        style={{ display: 'block', ...style }}
      >
        <path d={definition.icon.path} fill={`#${definition.icon.hex}`} />
      </svg>
    )
  }

  return (
    <span
      aria-hidden
      className="font-mono text-[11px] font-black uppercase tracking-[-0.02em]"
      style={{ color: definition?.fg ?? 'currentColor', ...style }}
    >
      {definition?.fallback ?? trimLabel(label)}
    </span>
  )
}
