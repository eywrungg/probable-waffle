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
    image: '/Projects/library-system-placeholder.svg',
  },
  {
    id: 'science-club',
    eyebrow: 'Community',
    title: 'Science Club Member',
    summary:
      "Actively building with the Science Club through software projects, experimentation, and collaborative campus initiatives.",
    meta: "St. Mary's College",
    accent: '#38bdf8',
    image: '/Projects/relox-placeholder.svg',
  },
  {
    id: 'hackathons',
    eyebrow: 'Competition',
    title: 'Hackathon Competitor',
    summary:
      'Joined fast-paced build environments where product clarity, execution speed, and problem solving mattered most.',
    meta: 'Events, sprints, prototypes',
    accent: '#a855f7',
    image: '/Projects/rick-morty-placeholder.svg',
  },
  {
    id: 'capstone',
    eyebrow: 'Leadership',
    title: 'Capstone Lead',
    summary:
      'Led project work that blended interface design, technical implementation, and research-backed execution.',
    meta: 'Research + product delivery',
    accent: '#22c55e',
    image: '/Projects/first-portfolio-placeholder.svg',
  },
]
