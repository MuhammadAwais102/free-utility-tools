# Free Utility Tools

Browser-first utility tools site built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npm run build
npm run start
```

`npm run start` serves the production build locally after `npm run build`.

## GitHub

This project is ready to be committed to a Git repository. The `.gitignore` excludes local dependencies, build output, logs, environment files, and common OS-specific files.

Typical setup:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Deployment notes

- The project is compatible with Vercel and similar Next.js hosts.
- No environment variables are currently required for local development or deployment.
- PDF and image processing is designed to run in the browser where possible, which keeps server requirements minimal.
- `pdf-lib` and `pdfjs-dist` are already included for browser-side PDF workflows.
- `next.config.ts` already sets `turbopack.root`, which avoids workspace-root warnings during builds.

## Included tools

- Image Resizer
- Image Compressor
- Image Converter
- YouTube Thumbnail Downloader
- PDF Merge
- PDF Split
- JPG to PDF
- PDF to JPG
