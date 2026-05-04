# Charles Arone Alcebar Portfolio

Personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This project is configured to deploy through **GitHub Actions**, not **Deploy from a branch**.

The workflow lives at:

```txt
.github/workflows/deploy.yml
```

When changes are pushed to `master`, GitHub Actions installs dependencies, runs `npm run build`, uploads the `dist` folder, and deploys it to GitHub Pages.

Current Pages URL:

```txt
https://eywrungg.github.io/probable-waffle/
```

Because the repository name is `probable-waffle`, Vite needs this base path:

```ts
base: '/probable-waffle/',
```

That setting is in:

```txt
vite.config.ts
```

The `public/404.html` file also redirects refreshed subpages back into the Vite app, so routes like `/projects`, `/achievements`, `/guestbook`, and `/blog` work on GitHub Pages.

## Using `https://eywrungg.github.io/` Instead

Yes, the site can use:

```txt
https://eywrungg.github.io/
```

But GitHub only gives that root URL to a special user site repository named exactly:

```txt
eywrungg.github.io
```

To use the root URL, create or rename the repo to `eywrungg.github.io`, then update:

```ts
base: '/',
```

Also update `public/404.html` so its `base` value is empty or `/`.

If this project stays in the `probable-waffle` repository, the correct GitHub Pages URL remains:

```txt
https://eywrungg.github.io/probable-waffle/
```
