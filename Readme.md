# DocTweak
DocTweak is a small React + Vite TypeScript app that demonstrates AI-powered document enhancement flows for Business and Students users. It provides UIs to paste a document, upload a document file (text files are auto-imported), specify a context/goal, and run a mock enhancement step that returns an improved document.

This README documents project structure, common tasks (dev/build), how the file-upload and favicon behavior works, and development notes.

---

## Features

- Two main pages: Business and Students, each with a document enhancer UI.
- Paste text or upload a file (supported types listed below). Text files (.txt, .md, .json) are auto-read and pasted into the textarea.
- Upload UI uses a styled button and a hidden native file input for accessibility.
- Mock AI enhancement flow (client-side) that returns a formatted enhanced document including uploaded filename if present.
- Favicon and PWA manifest updated to prefer an SVG favicon and provide high-resolution PNG fallbacks.

## Supported upload types

The app accepts these file types in the upload control:

- Text-like files: `.txt`, `.md`, `.json`, `text/*` — automatically read and pasted into the textarea.
- Binary/doc formats: `application/pdf`, `.doc`, `.docx` — accepted as attachments; filename is shown and included in the enhancement output (no client-side text extraction).

If you want DOCX/PDF text extraction, we can add client-side libraries (e.g., `mammoth` for DOCX, `pdfjs-dist` for PDFs) or perform extraction server-side.

## Project structure (important files)

- `index.html` — main HTML file; favicons and meta are defined here.
- `src/main.tsx` — app entry.
- `src/App.tsx` — top-level layout (if present).
- `src/pages/Business.tsx` — Business document enhancer page (paste + upload + context + enhance).
- `src/pages/Students.tsx` — Student document enhancer page (same functionality as Business with different copy & styles).
- `src/components/ui/*` — UI primitives (Button, Card, Textarea, etc.).
- `public/` — static files:
	- `favicon.svg`, `favicon.svg.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `site.webmanifest`

## Development

Prerequisites
- Node.js 18+ (recommended)
- npm or pnpm

Install dependencies:

```powershell
npm install
```

Run dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

## How to test the upload + enhancement flow

1. Start the dev server (`npm run dev`).
2. Open the app in a browser and navigate to either the Business or Students page.
3. Under "Your Document", either paste text into the textarea or click "Choose File" to upload a file.
	 - If you upload a `.txt` or `.md`, the textarea should populate with the file contents automatically.
	 - If you upload a PDF or DOCX, the filename will be shown and included in the enhanced output.
4. Fill the Context/Goal textarea (required) and click the Enhance button.
5. A mocked enhanced document will appear in the Enhanced Document section. For file uploads, the filename will be shown in the enhanced output.

Notes on caching: browsers heavily cache favicons. If you swap icons, you may need a hard refresh (Ctrl+F5) or an incognito window to see changes.

## Favicon & PWA notes

- `index.html` now prefers `favicon.svg` for crisp scaling and also references 192×192 and 512×512 PNGs for wider browser/platform support.
- `public/site.webmanifest` contains the 192 and 512 icons so PWA install previews pick larger assets.
- If you want the raster `favicon.svg.png` replaced with a specific 512×512 PNG, I can generate and overwrite it from `favicon.svg`.

## Next steps & optional improvements

- Add drag-and-drop file upload area.
- Add client-side DOCX/PDF text extraction (requires adding dependencies).
- Support multiple attachments and previews.
- Wire enhancement to a real AI backend (OpenAI/Anthropic/etc.) and handle uploads server-side.
- Add tests for the pages and upload behavior.


