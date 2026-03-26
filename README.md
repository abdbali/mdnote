# mdnote

`mdnote` is a fully offline-first Markdown notes app that runs directly in the browser.
No build step is required.

---

## Features

| Area | Details |
|---|---|
| Notes | Create, edit, delete notes |
| Storage | IndexedDB primary + localStorage fallback |
| Autosave | Debounced autosave (300ms) |
| Versioning | Keeps last 5 versions per note |
| Markdown | Live render with bundled parser |
| Import/Export | `.md` import and export |
| UI | Minimal icon dock, expandable controls on hover |
| Navigation | Compact left history drawer |
| Personalization | Theme toggle + 3 editor fonts |

---

## UI Behavior

| Component | Behavior |
|---|---|
| Bottom dock (collapsed) | Shows only symbols/icons |
| Overflow writing mode | When line 6 starts, focus mode opens and non-greeting UI is moved into editor view |
| Bottom dock (hover/focus) | Expands and shows icon + text |
| Quick insert buttons | Click to auto-insert `H1`, list item, code block |
| Greeting line | Time-aware greeting + rotating mood phrase |
| New note placeholder | Randomly picked from 5 English prompt alternatives |
| History cards | Show note title + first content line + first tag |

---

## Project Structure

| Path | Purpose |
|---|---|
| `index.html` | App shell |
| `css/style.css` | Theme, layout, interactions |
| `js/app.js` | Main state/events/app flow |
| `js/storage.js` | IndexedDB/localStorage layer |
| `js/editor.js` | Markdown render + helpers |
| `js/ui.js` | UI rendering and hydration |
| `js/vendor/marked.min.js` | Bundled lightweight markdown parser |
| `Dockerfile` | Containerized runtime |
| `docker-compose.yml` | Local container orchestration |

---

## Run Options

### 1) Direct (No server)

| Command | Notes |
|---|---|
| Open `index.html` | Fastest option for personal local usage |

### 2) Terminal (Local HTTP)

| Tool | Command | URL |
|---|---|---|
| Python 3 | `python3 -m http.server 8080` | `http://localhost:8080` |
| Node (serve) | `npx serve . -l 8080` | `http://localhost:8080` |
| PHP | `php -S 0.0.0.0:8080` | `http://localhost:8080` |

---

## Docker Setup

### Build & Run (Docker)

| Step | Command |
|---|---|
| Build image | `docker build -t mdnote:latest .` |
| Run container | `docker run --rm -p 8080:8080 --name mdnote mdnote:latest` |
| Open app | `http://localhost:8080` |

### Docker Compose

| Step | Command |
|---|---|
| Start | `docker compose up -d --build` |
| Logs | `docker compose logs -f` |
| Stop | `docker compose down` |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + S` | Force save |
| `Ctrl/Cmd + N` | New note |

---

## Data Model

| Field | Description |
|---|---|
| `id` | Note UUID |
| `title` | Note title |
| `content` | Markdown content |
| `tags` | String array of tags |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |
| `versions` | Last 5 snapshots |

---

## Offline Notes

- Works without internet after files are local.
- Uses IndexedDB when available.
- Falls back to localStorage automatically.
