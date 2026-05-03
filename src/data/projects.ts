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
  category?: 'Development Projects' | 'App & AR Projects' | 'Creative Works'
  orientation?: 'landscape' | 'portrait'
  gallery?: string[]
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
    image: '/Projects/SMCBI Library Book Borrowing System.png',
    category: 'Development Projects',
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
    image: '/Projects/Firstportfolio.png',
    href: 'https://eywrungg.github.io/ALCEBAR-portfolio/',
    category: 'Development Projects',
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
    image: '/Projects/Relux.png',
    href: 'https://luxury-watch-website-with-api.vercel.app/',
    category: 'Development Projects',
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
    image: '/Projects/RICK&MORTY.png',
    category: 'Development Projects',
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
    image: '/Projects/Frontend Enhancement Project.png',
    category: 'Development Projects',
  },
  {
    index: '06',
    label: 'Web Game',
    title: 'Web-Based Imposter Game',
    description:
      'A browser-based imposter party game built in TypeScript with Gemini API support for AI-assisted prompts and role interactions.',
    highlights: [
      'Built as an interactive web game using TypeScript.',
      'Centered around imposter-style role play, deduction, and session-based game flow.',
      'Integrated Gemini API features to support AI-assisted game prompts and interactions.',
    ],
    chips: ['TypeScript', 'Gemini API', 'Game Logic', 'Web App'],
    accent: '#f97316',
    image: '/Projects/Web-Based Imposter Game.png',
    href: 'https://web-based-imposter-game.vercel.app/',
    category: 'Development Projects',
  },
  {
    index: '07',
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
    image: '/Projects/SMCBI Library Book Borrowing System.png',
    category: 'Development Projects',
  },
  {
    index: '08',
    label: 'Mobile App',
    title: 'PyroWatch APK',
    description:
      'A mobile APK companion for PyroWatch, built around fire safety monitoring, manual controls, and quick access to system status.',
    highlights: [
      'Built as an installable Android APK for the PyroWatch fire safety project.',
      'Designed mobile screens for monitoring, manual control, and emergency-focused interaction.',
      'Connected the app experience to the larger PyroWatch system workflow.',
    ],
    chips: ['Mobile App', 'APK', 'Fire Safety', 'PyroWatch'],
    accent: '#ef4444',
    image: '/Projects/Pyrowatch_apk_auto.jpg',
    category: 'App & AR Projects',
    orientation: 'portrait',
    gallery: ['/Projects/Pyrowatch_apk_auto.jpg', '/Projects/Pyrowatch_apk_manual.jpg'],
  },
  {
    index: '09',
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
    image: '/Projects/canvaportfolio.png',
    href: 'https://alcebar-charlesarone-midtermportfolio.my.canva.site/',
    category: 'Development Projects',
  },
  {
    index: '10',
    label: 'Current Project',
    title: 'Campus AR Navigation',
    description:
      'A currently in-progress campus navigation project using AR technology in Unity to help students find rooms and campus locations.',
    highlights: [
      'Built around Unity-based AR navigation for campus wayfinding.',
      'Focuses on guiding users through campus spaces with visual direction cues.',
      'Currently being developed as an active project connected to my IT and AR learning path.',
    ],
    chips: ['Unity', 'AR Technology', 'Campus Navigation', 'Current Project'],
    accent: '#38bdf8',
    image: '/Projects/campus-ar-navigation.svg',
    category: 'App & AR Projects',
    orientation: 'portrait',
  },
  {
    index: '11',
    label: 'UI Design',
    title: 'First-Year UI Design Set',
    description:
      'A first-year interface design set covering dashboard, login, and signup screens while practicing visual hierarchy and form layouts.',
    highlights: [
      'Designed dashboard, login form, and signup screens as early UI practice.',
      'Focused on structure, spacing, and readable form presentation.',
      'Shows the starting point of my visual design and interface layout growth.',
    ],
    chips: ['Dashboard', 'Login Form', 'Signup', 'UI Design'],
    accent: '#f4f4f5',
    image: '/Projects/dashdashboard.jpg',
    category: 'Creative Works',
    gallery: ['/Projects/dashdashboard.jpg', '/Projects/login-in-form.jpg', '/Projects/sign-up.jpg'],
  },
  {
    index: '12',
    label: 'Poster Design',
    title: 'Third-Year Photoshop Posters',
    description:
      'Poster design work from third year, created in Photoshop with attention to composition, visual emphasis, and presentation polish.',
    highlights: [
      'Created poster layouts using Adobe Photoshop.',
      'Practiced composition, typography, and visual hierarchy for event-style graphics.',
      'Expanded my creative workflow beyond code through graphic design.',
    ],
    chips: ['Photoshop', 'Poster', 'Graphic Design', 'Creative Work'],
    accent: '#f4f4f5',
    image: '/Projects/alcebar_posterfinal.jpg',
    category: 'Creative Works',
    orientation: 'portrait',
    gallery: ['/Projects/alcebar_posterfinal.jpg', '/Projects/Alcebar_CharlesArone_ChecklistPoster.jpg'],
  },
]

export const allProjects: Project[] = [...featuredProjects, ...archiveOnlyProjects]

export const projects = featuredProjects
