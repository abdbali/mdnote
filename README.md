<!-- HERO -->
<h1 style="font-size: 42px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px;">
</h1>

<p style="font-size: 18px; max-width: 720px; line-height: 1.6;">
A fully offline-first Markdown notes application that runs directly in the browser. Designed for speed, resilience, and zero dependency environments.
</p>
<p style="margin-top: 12px;">
<img src="https://img.shields.io/badge/status-stable-black?style=flat" />
<img src="https://img.shields.io/badge/offline-first-critical" />
<img src="https://img.shields.io/badge/no-build-required-informational" />
<img src="https://img.shields.io/badge/license-MIT-lightgrey" />
</p>
<br/>
<div style="
height: 6px;
width: 180px;
border-radius: 999px;
background: linear-gradient(90deg, #ffb3c1, #d1d5db);
"></div>
<br/>
<!-- HERO PANEL -->
<div style="
max-width: 860px;
padding: 32px;
border-radius: 18px;
background: linear-gradient(135deg, rgba(255,179,193,0.10), rgba(209,213,219,0.08));
border: 1px solid rgba(0,0,0,0.06);
">
<img width="432" height="76" alt="image" src="https://github.com/user-attachments/assets/26d8a6ec-564b-44e6-9dbb-063a77da30fc" />

<p style="font-size: 16px; line-height: 1.8;">
mdnote delivers a distraction-free writing environment with a fully offline-first architecture. It leverages native browser storage systems to ensure your notes remain available, persistent, and safe across sessions — even without connectivity.
</p>
<p style="font-size: 16px; line-height: 1.8;">
No installation. No build process. No external services. Just open and start writing.
</p>
</div>
<br/>
<!-- VALUE PROPS -->
Why mdnote
<table>
<tr><td><b>Offline-first by design</b></td><td>Your data stays accessible without internet</td></tr>
<tr><td><b>Zero setup workflow</b></td><td>No installation or build tools required</td></tr>
<tr><td><b>Fast execution</b></td><td>Instant load and minimal runtime overhead</td></tr>
<tr><td><b>Resilient storage</b></td><td>IndexedDB with automatic fallback</td></tr>
<tr><td><b>Minimal interface</b></td><td>Focused writing experience without clutter</td></tr>
<tr><td><b>Portable</b></td><td>Works across all major operating systems</td></tr>
</table>
<br/>

<img width="757" height="413" alt="image" src="https://github.com/user-attachments/assets/53804ea2-0ba7-433e-bfee-329f504d0a2d" />

<!-- FEATURES -->
Features
<table>
<tr><td><b>Notes</b></td><td>Create, edit, delete notes</td></tr>
<tr><td><b>Autosave</b></td><td>Debounced autosave (300ms)</td></tr>
<tr><td><b>Versioning</b></td><td>Last 5 snapshots per note</td></tr>
<tr><td><b>Markdown</b></td><td>Live rendering engine</td></tr>
<tr><td><b>Import / Export</b></td><td>Full .md compatibility</td></tr>
<tr><td><b>Storage</b></td><td>IndexedDB + localStorage fallback</td></tr>
<tr><td><b>UI System</b></td><td>Dock-based interaction model</td></tr>
<tr><td><b>Navigation</b></td><td>Compact history drawer</td></tr>
<tr><td><b>Personalization</b></td><td>Theme and font selection</td></tr>
</table>
<br/>

<img width="807" height="309" alt="image" src="https://github.com/user-attachments/assets/05e3b80d-eff5-4916-ba4c-c010ca30d2c7" />

<!-- DEMO / QUICK START -->
Quick Start
```bash id="qs1"
# direct usage
open index.html
```
```bash id="qs2"
# local server options
python3 -m http.server 8080
npx serve . -l 8080
php -S 0.0.0.0:8080
```
<br/>
Docker
```bash id="dk1"
docker build -t mdnote:latest .
docker run --rm -p 8080:8080 mdnote
```
<br/>
<!-- ARCHITECTURE -->
Architecture
<table>
<tr><td><b>index.html</b></td><td>Application entry point</td></tr>
<tr><td><b>css/style.css</b></td><td>Layout and theming system</td></tr>
<tr><td><b>js/app.js</b></td><td>Core application flow</td></tr>
<tr><td><b>js/storage.js</b></td><td>Persistence layer</td></tr>
<tr><td><b>js/editor.js</b></td><td>Markdown engine</td></tr>
<tr><td><b>js/ui.js</b></td><td>UI rendering logic</td></tr>
</table>
<br/>
<!-- SYSTEM -->
Platform Support
macOS
Windows
Linux
Ubuntu Server
Modern Browsers
<br/>
<!-- PHILOSOPHY -->
Philosophy
mdnote is built on a simple idea: software should remain usable regardless of infrastructure.
It avoids unnecessary complexity and external dependencies, focusing instead on durability, clarity, and long-term usability.
<br/>
<div style="
height: 4px;
width: 120px;
border-radius: 999px;
background: linear-gradient(90deg, #ffb3c1, #d1d5db);
"></div>
<br/>
License
MIT License
<br/>
https://github.com/abdbali/mdnote.git
<br/>
Fast. Offline. Minimal.
