export type Project = {
  index: string
  label: string
  title: string
  description: string
  highlights: string[]
  chips: string[]
  accent: string
  image: string
  href?: string
}

export const featuredProjects: Project[] = [
  {
    index: '01',
    label: 'Web App',
    title: 'School Library Book Borrowing System',
    description:
      'A Laravel-based school library platform for inventory, approvals, overdue handling, and student notifications.',
    highlights: [
      'Bulk upload for books and bulk approval for borrowing workflows.',
      'Book image URL support, school email login, and Laravel queue workers for OTP and overdue jobs.',
      'Admin settings for fines and overdue rules, plus email notifications and reminder alerts for students.',
    ],
    chips: ['Laravel', 'MySQL', 'Queues', 'Email', 'Admin Panel'],
    accent: '#f59e0b',
    image: '/Projects/library-system-placeholder.svg',
  },
  {
    index: '02',
    label: 'Portfolio',
    title: 'My First Portfolio',
    description:
      'My first personal site built with plain HTML and CSS while learning layout, styling, and project presentation.',
    highlights: [
      'Built as a static site using foundational frontend skills.',
      'Helped me practice layout, typography, and project presentation before moving into frameworks.',
      'Serves as a snapshot of my starting point and growth as a frontend developer.',
    ],
    chips: ['HTML', 'CSS', 'Responsive Layout'],
    accent: '#22c55e',
    image: '/Projects/first-portfolio-placeholder.svg',
    href: 'https://eywrungg.github.io/ALCEBAR-portfolio/',
  },
  {
    index: '03',
    label: 'E-Commerce',
    title: 'Relox Luxury Watch Store',
    description:
      'A React luxury watch storefront connected to a Laravel API and backend system for product and commerce data.',
    highlights: [
      'Frontend built in React with image-driven product presentation.',
      'Connected to a Laravel API and backend admin system for catalog and commerce data.',
      'Made for a premium watch shopping experience with a branded, dataset-powered product flow.',
    ],
    chips: ['React', 'Laravel API', 'E-Commerce', 'REST API'],
    accent: '#38bdf8',
    image: '/Projects/relox-placeholder.svg',
  },
  {
    index: '04',
    label: 'API Explorer',
    title: 'Rick and Morty API (Laravel)',
    description:
      'A Laravel explorer for characters, episodes, and locations powered by the public Rick and Morty API.',
    highlights: [
      'Character explorer, episode listing, and location viewer powered by the public Rick and Morty API.',
      'Search and filter support with a fast, clean UI using Blade templates and TailwindCSS.',
      'Built with Laravel 11+, Blade, TailwindCSS, and Axios or Fetch for dynamic data handling.',
    ],
    chips: ['Laravel 11+', 'Blade', 'TailwindCSS', 'API Integration'],
    accent: '#a855f7',
    image: '/Projects/rick-morty-placeholder.svg',
  },
]

const archiveOnlyProjects: Project[] = [
  {
    index: '05',
    label: 'Frontend',
    title: 'Frontend Enhancement Project',
    description:
      'A fork-based frontend enhancement exercise focused on updating layout polish, UI quality, and implementation details on the web.',
    highlights: [
      'Worked from a forked codebase and improved the frontend presentation layer.',
      'Focused on interface refinement, structure cleanup, and practical visual improvements.',
      'Used as a project to sharpen UI judgment and implementation consistency.',
    ],
    chips: ['HTML', 'Frontend', 'UI Polish', 'Forked Project'],
    accent: '#fb7185',
    image: '/Projects/first-portfolio-placeholder.svg',
  },
  {
    index: '06',
    label: 'Web Game',
    title: 'Web-Based Imposter Game',
    description:
      'A browser-based imposter party game built in TypeScript with role-based gameplay and a web-first multiplayer-style experience.',
    highlights: [
      'Built as an interactive web game using TypeScript.',
      'Centered around imposter-style role play, deduction, and session-based game flow.',
      'Explored game UI, state handling, and player-facing interaction design in the browser.',
    ],
    chips: ['TypeScript', 'Game Logic', 'Web App', 'Interactive UI'],
    accent: '#f97316',
    image: '/Projects/rick-morty-placeholder.svg',
  },
  {
    index: '07',
    label: 'AI Game',
    title: 'Imposter Game with Gemini',
    description:
      'An imposter game variant enhanced with Gemini, blending TypeScript gameplay with AI-assisted prompts or role interactions.',
    highlights: [
      'Extended the imposter game concept with Gemini-powered AI behavior or content.',
      'Combined game logic with AI-assisted interaction for a more dynamic experience.',
      'Used as an experiment in mixing entertainment features with modern AI tooling.',
    ],
    chips: ['TypeScript', 'Gemini', 'AI Features', 'Game Project'],
    accent: '#8b5cf6',
    image: '/Projects/relox-placeholder.svg',
  },
  {
    index: '08',
    label: 'API',
    title: 'Alcebar Bible API',
    description:
      'A PHP API project for Bible-related data access, built to expose structured content through backend endpoints.',
    highlights: [
      'Created backend API routes for structured scripture-related data.',
      'Focused on PHP-based server logic and data delivery.',
      'Expanded backend experience through API design and content handling.',
    ],
    chips: ['PHP', 'API', 'Backend', 'Data Access'],
    accent: '#22c55e',
    image: '/Projects/library-system-placeholder.svg',
  },
  {
    index: '09',
    label: 'Blade App',
    title: 'Alcebar Fish',
    description:
      'A Blade-based Laravel project that continues my practice in server-rendered UI, application structure, and practical feature development.',
    highlights: [
      'Built with Blade templates in a Laravel-style workflow.',
      'Focused on page rendering, layout structure, and backend-connected views.',
      'Helped strengthen hands-on experience in PHP application development.',
    ],
    chips: ['Blade', 'Laravel', 'PHP', 'Server Rendered'],
    accent: '#06b6d4',
    image: '/Projects/library-system-placeholder.svg',
  },
  {
    index: '10',
    label: 'Portfolio',
    title: 'Canva Portfolio',
    description:
      'A personal portfolio designed in Canva and published on the web, exploring a faster visual-first approach to presenting my work.',
    highlights: [
      'Designed in Canva with a presentation-first workflow.',
      'Published online as an alternative portfolio format.',
      'Used to experiment with visual storytelling outside a traditional coded build.',
    ],
    chips: ['Canva', 'Portfolio', 'Published Web Page', 'Visual Design'],
    accent: '#f59e0b',
    image: '/Projects/first-portfolio-placeholder.svg',
  },
]

export const allProjects: Project[] = [...featuredProjects, ...archiveOnlyProjects]

export const projects = featuredProjects
