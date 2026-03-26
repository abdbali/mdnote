# Markdown Notes (Offline-First)

A production-ready Markdown Notes app built with **HTML + CSS + Bootstrap + Vanilla JS**, designed to run entirely in-browser with no build tools.

## Features

- Create, edit, delete notes
- IndexedDB persistence with localStorage fallback
- Split view: Markdown editor + live preview
- Debounced autosave (300ms)
- Last 5 versions stored per note
- Real-time search across title/content/tags
- Sorting options (updated/title)
- Import `.md` and export note as `.md`
- Theme toggle (dark/light) with persisted preference
- Keyboard shortcuts:
  - `Ctrl/Cmd + S` → save immediately
  - `Ctrl/Cmd + N` → create note
- Word count + autosave + last edited indicators
- Responsive, modern glassmorphism UI

## Project Structure

```text
/project
 ├── index.html
 ├── css/
 │    └── style.css
 ├── js/
 │    ├── app.js
 │    ├── storage.js
 │    ├── editor.js
 │    ├── ui.js
 │    └── vendor/
 │         └── marked.min.js
 ├── assets/
 └── README.md
```

## Run Locally

1. Download or clone this folder.
2. Open `index.html` directly in your browser.
3. Start taking notes.

> No installation, no build step, and no server required.

## Data Model

Each note stores:

- `id`
- `title`
- `content`
- `tags` (array)
- `created_at`
- `updated_at`
- `versions` (up to 5 snapshots)

## Offline Details

- Primary persistence: IndexedDB (`mdnotes-db` / `notes` store)
- Fallback persistence: localStorage (`mdnotes-local-fallback`)
- Markdown parser is bundled at `js/vendor/marked.min.js`

## UX/Design Notes

- Claude-inspired typography (`Inter`, with system fallback)
- Dark-first palette with pastel pink accent (`#f4c2c2`) and soft grays
- Rounded corners, subtle shadows, smooth transitions

## Browser Compatibility

Works on modern Chromium, Firefox, and Safari versions supporting:

- ES Modules
- IndexedDB
- `crypto.randomUUID`

