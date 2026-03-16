# Project Context

## Overview
- Project name: `free-utility-tools`
- Stack: Next.js 16 App Router, TypeScript, Tailwind CSS v4
- Package manager: `npm`
- Goal: a browser-first free utility tools website with clean shared UI, modular tool architecture, and client-side processing where practical

## Current Status
- The app is production-ready for local development and deployment.
- The homepage and shared shell were redesigned around a more polished SaaS-style layout.
- The homepage tool grid is dynamic and powered by the manual registry in `lib/site.ts`.
- Category counts, category tabs, and search all derive from the real tool registry.
- `npm run lint` passes.
- `npm run build` passes.
- Metadata is set up for the homepage and current tool pages.
- App icon is present at `app/icon.svg`.

## Root Structure
- `app/`: App Router pages, layout, metadata, global CSS
- `components/`: reusable layout, shared UI, and tool-specific components
- `lib/`: shared helpers and browser-side processing logic
- `types/`: shared TypeScript types

## Current Tool Registry
There are currently 15 shipped tools across 6 categories.

### Image
- `/tools/image-resizer`
- `/tools/image-compressor`
- `/tools/image-converter`
- `/tools/bulk-image-resizer`

### Animation
- `/tools/gif-resizer`
- `/tools/gif-converter`

### Data
- `/tools/xml-prettify`
- `/tools/xml-to-json`
- `/tools/json-to-xml`

### Video
- `/tools/youtube-thumbnail-downloader`

### PDF
- `/tools/pdf-merge`
- `/tools/pdf-split`
- `/tools/jpg-to-pdf`
- `/tools/pdf-to-jpg`

### Career
- `/tools/cv-maker`

## Important Shared Files
- `app/layout.tsx`: root metadata, font setup, and site shell composition
- `app/page.tsx`: homepage composition
- `app/globals.css`: global design tokens, category colors, hover states, and homepage utility classes
- `lib/site.ts`: site metadata, navigation, footer links, tool registry, category helpers, and metadata helpers
- `lib/utils.ts`: common helpers like `cn`, byte formatting, number formatting, and `reorderItems`
- `components/layout/header.tsx`: sticky header
- `components/layout/footer.tsx`: footer
- `components/shared/tool-browser.tsx`: homepage search + category filter UI
- `components/shared/tool-card.tsx`: homepage tool card UI
- `components/shared/tool-icon.tsx`: centralized tool/category icon mapping and category presentation helpers
- `components/shared/home-hero.tsx`: homepage hero section
- `components/shared/home-features.tsx`: homepage feature cards
- `components/shared/home-cta.tsx`: homepage CTA section

## Homepage / Shell Notes
- The current homepage follows the redesign reference that was implemented on top of the existing architecture.
- Header:
  - sticky
  - branded as `Free Utility Tools`
  - nav links for tools, features, about, contact
- Hero:
  - trust badge
  - large marketing headline
  - trust signals
  - floating category cards
- Tool section:
  - dynamic search
  - dynamic category tabs
  - tool cards sourced from `lib/site.ts`
- Footer:
  - brand block
  - explore links
  - legal links

## Category System
- Categories are defined in `lib/site.ts`.
- Category display order:
  - `Image`
  - `Animation`
  - `Data`
  - `Video`
  - `PDF`
  - `Career`
- Lowercase category keys are used for homepage filtering:
  - `all`
  - `image`
  - `animation`
  - `data`
  - `video`
  - `pdf`
  - `career`

## Key Dependencies
- `next`, `react`, `react-dom`: core app framework
- `lucide-react`: centralized icon system for homepage/shared UI
- `pdf-lib`: browser-side PDF merge, split, and image-to-PDF generation
- `pdfjs-dist`: browser-side PDF rendering for PDF-to-JPG
- `gifuct-js`: animated GIF parsing
- `gifenc`: animated GIF encoding

## Tool Architecture Notes

### Image tools
- Logic lives under `lib/image/`
- UI lives under `components/tools/image/`
- Shared upload UI uses `components/shared/file-upload.tsx`
- Shared output/format handling was centralized during the image-tool upgrade pass

### Animation tools
- Logic lives under `lib/animation/`
- UI lives under `components/tools/animation/`
- Animated GIF handling is real frame-by-frame processing, not first-frame-only fakery

### Data tools
- Logic lives under `lib/data/`
- UI lives under `components/tools/data/`
- XML/JSON conversion uses consistent structure rules:
  - attributes under `@attributes`
  - text nodes under `#text`
  - repeated sibling tags become arrays

### PDF tools
- Logic lives under `lib/pdf/`
- UI lives under `components/tools/pdf/`
- Processing is browser-side using `pdf-lib` and `pdfjs-dist`

### YouTube Thumbnail Downloader
- URL parsing lives under `lib/youtube/extract-video-id.ts`
- Thumbnail generation lives under `lib/youtube/thumbnail-urls.ts`
- No backend or external API is used

### CV Maker
- Route: `app/tools/cv-maker/page.tsx`
- Main client entry: `components/tools/cv/cv-maker-client.tsx`
- Types: `types/cv.ts`
- Shared helpers: `lib/cv/`
- UI: `components/tools/cv/`
- Supports browser print / save-as-PDF for export

## Design / UX Conventions
- Keep route pages lean and focused on composition.
- Put reusable feature UI close to the feature under `components/tools/...`.
- Put shared logic under `lib/...`.
- Put shared types under `types/...`.
- Prefer browser APIs over extra dependencies unless a library is clearly justified.
- Preserve the existing homepage/tool-card/layout style unless a task explicitly asks for a redesign.
- Reuse the registry in `lib/site.ts` instead of hardcoding homepage cards or counts.

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
- If a future redesign changes category visuals or iconography, update `components/shared/tool-icon.tsx` and `app/globals.css` first.
- The CV Maker uses browser print for PDF export, not a generated-PDF library.
- GIF/video support is intentionally narrow and truthful; do not advertise unsupported conversions.
- Legal/contact copy is generic product copy and may still need real business/legal review before a public launch.
