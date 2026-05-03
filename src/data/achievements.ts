export type Achievement = {
  id: string
  eyebrow: string
  title: string
  summary: string
  meta: string
  accent: string
  image: string
}

export const achievements: Achievement[] = [
  {
    id: 'google-ai',
    eyebrow: 'Milestone',
    title: 'Google AI Program',
    summary:
      "Completed Google's AI learning track and strengthened my foundation in practical AI tools, workflows, and product thinking.",
    meta: '2026 - Intensive AI learning path',
    accent: '#fb923c',
    image: '/Projects/canvaportfolio.png',
  },
  {
    id: 'harmonics-club',
    eyebrow: 'Community',
    title: 'Harmonics Club Member',
    summary:
      "Singing with the Harmonics Club in church and during school Masses, campus gatherings, and community moments.",
    meta: "St. Mary's College",
    accent: '#38bdf8',
    image: '/PHOTO.jpeg',
  },
  {
    id: 'deans-lister',
    eyebrow: 'Academic',
    title: "Dean's Lister / Honors",
    summary:
      "Currently maintaining Dean's Lister standing and academic honors while continuing project, research, and creative work.",
    meta: 'Academic consistency',
    accent: '#a855f7',
    image: '/Projects/Pyrowatch_apk_auto.jpg',
  },
  {
    id: 'capstone',
    eyebrow: 'Leadership',
    title: 'Capstone Lead',
    summary:
      'Led project work that blended interface design, technical implementation, and research-backed execution.',
    meta: 'Research + product delivery',
    accent: '#22c55e',
    image: '/Projects/Pyrowatch_apk_manual.jpg',
  },
]
