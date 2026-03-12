# Project Context

## Overview
- Project name: `free-utility-tools`
- Stack: Next.js 16 App Router, TypeScript, Tailwind CSS v4
- Package manager: `npm`
- Goal: a browser-first free utility tools website with lightweight client-side processing where possible

## Current Status
- The app is structured and production-ready for local development and deployment.
- The homepage, shared site shell, and all current tool routes are implemented.
- `npm run lint` passes.
- `npm run build` passes.
- Metadata is set up for the homepage and tool pages.
- App icon files exist in `app/icon.svg` and `app/favicon.ico`.

## Root Structure
- `app/`: App Router pages and layout
- `components/`: reusable UI, shared pieces, and tool-specific components
- `lib/`: shared helpers and browser-side processing logic
- `types/`: shared TypeScript types
- `public/`: static assets

## Implemented Tool Routes
- `/tools/image-resizer`
- `/tools/image-compressor`
- `/tools/image-converter`
- `/tools/youtube-thumbnail-downloader`
- `/tools/pdf-merge`
- `/tools/pdf-split`
- `/tools/jpg-to-pdf`
- `/tools/pdf-to-jpg`
- `/tools/cv-maker`

## Important Shared Files
- `app/layout.tsx`: root metadata and site shell composition
- `app/page.tsx`: homepage
- `lib/site.ts`: site metadata, navigation, footer links, and homepage tool registry
- `lib/utils.ts`: common helpers like `cn`, byte formatting, and `reorderItems`
- `components/layout/header.tsx`: sticky header
- `components/layout/footer.tsx`: footer
- `components/shared/page-header.tsx`: shared tool page heading component
- `components/shared/tool-browser.tsx`: homepage tool search/filter UI
- `components/shared/tool-card.tsx`: homepage tool card UI

## Key Dependencies
- `next`, `react`, `react-dom`: core app framework
- `pdf-lib`: browser-side PDF merge, split, and image-to-PDF generation
- `pdfjs-dist`: browser-side PDF page rendering for PDF-to-JPG

## Tool Architecture Notes

### Image tools
- Image logic lives under `lib/image/`
- Tool UI lives under `components/tools/image/`
- Shared upload UI uses `components/shared/file-upload.tsx`
- The upload interaction was fixed to use a reliable `inputRef.current?.click()` pattern

### PDF tools
- PDF logic lives under `lib/pdf/`
- Tool UI lives under `components/tools/pdf/`
- Processing is browser-side using `pdf-lib` and `pdfjs-dist`

### YouTube Thumbnail Downloader
- URL parsing lives under `lib/youtube/extract-video-id.ts`
- Thumbnail generation lives under `lib/youtube/thumbnail-urls.ts`
- No backend or external API is used

### CV Maker
- Route: `app/tools/cv-maker/page.tsx`
- Main client entry: `components/tools/cv/cv-maker-client.tsx`
- Types: `types/cv.ts`
- Shared CV helpers: `lib/cv/`
- CV UI: `components/tools/cv/`

#### CV Maker features
- Controlled form state
- Repeatable sections for:
  - experience
  - education
  - projects
  - skills
- Live preview on the same page
- Reorder/remove support for repeatable entries
- Better empty states and preview layout
- Print / Save as PDF support using browser print

#### CV print/export flow
- Triggered by `Print / Save as PDF` in `components/tools/cv/cv-maker-client.tsx`
- Uses `lib/cv/print.ts` to call `window.print()`
- Uses `components/tools/cv/cv-print-styles.tsx` for CV-specific print CSS
- Print output is scoped to the preview only; form UI, header, footer, and helper notes are hidden during print

## Conventions
- Keep route pages lean and focused on composition
- Put reusable feature UI close to the feature under `components/tools/...`
- Put shared logic under `lib/...`
- Put shared types under `types/...`
- Prefer browser APIs over extra dependencies unless a library is clearly justified
- Use `apply_patch` for manual file edits

## Local Development
```bash
npm install
npm run dev
```

Open:
- Homepage: `http://localhost:3000`
- CV Maker: `http://localhost:3000/tools/cv-maker`

## Validation Commands
```bash
npm run lint
npm run build
```

## Notes For Future Work
- The homepage tool registry is manual in `lib/site.ts`, so new tools should usually be added there.
- The CV Maker currently supports print/save-as-PDF via browser print, not generated PDFs via a separate library.
- The legal/contact pages are generic production-safe copy, but may still need real business/legal content later.
- The design system is intentionally lightweight and component-based; avoid large refactors unless necessary.
