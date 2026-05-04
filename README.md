# Charles Arone Alcebar Portfolio

A personal portfolio website for presenting my projects, skills, achievements, creative work, and contact links. The site is built as a fast single-page React app with extra pages for the project archive, achievements, blog, and guestbook.

Live site:

```txt
https://eywrungg.github.io/probable-waffle/
```

## Features

- Responsive portfolio layout with bento-style sections
- Project showcase with featured projects and archive pages
- Achievements and creative work sections
- Guestbook page powered by Supabase
- Smooth animations and interactive hover effects
- GitHub Pages deployment through GitHub Actions

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Supabase
- GitHub Pages

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```txt
src/
  components/    Reusable UI components
  data/          Project and achievement data
  lib/           Helpers and external service logic
  pages/         Standalone portfolio pages
  sections/      Main homepage sections
public/          Static images and GitHub Pages files
```

## Deployment

This project deploys to GitHub Pages with GitHub Actions. The workflow builds the Vite app and publishes the generated `dist` folder.

The deployed site uses the repository path `/probable-waffle/`, so `vite.config.ts` includes:

```ts
base: '/probable-waffle/',
```

## Author

Charles Arone Alcebar

- GitHub: [eywrungg](https://github.com/eywrungg)
- LinkedIn: [charles0202](https://www.linkedin.com/in/charles0202/)
