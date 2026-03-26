<div align="center">

<!-- LOGO -->

<img src="https://raw.githubusercontent.com/abdbali/mdnote/main/assets/logo.png" width="120" alt="mdnote logo"/>

<br/>
<br/>

<h1 style="font-weight: 600; letter-spacing: -0.5px;">
mdnote
</h1>

<p style="max-width: 640px; font-size: 16px;">
A fully offline-first Markdown notes application that runs directly in the browser.
</p>

<p style="max-width: 640px; font-size: 14px; opacity: 0.7;">
No build step. No dependencies. No network requirement.
</p>

<br/>

<!-- BADGES -->

<p>
<img src="https://img.shields.io/badge/status-stable-black?style=flat&logo=github" />
<img src="https://img.shields.io/badge/offline-first-important" />
<img src="https://img.shields.io/badge/no-build-required-informational" />
<img src="https://img.shields.io/badge/license-MIT-lightgrey" />
</p>

<br/>

<!-- GRADIENT LINE -->

<div style="width: 120px; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #ffb3c1, #d1d5db);"></div>

<br/>
<br/>

<!-- HERO PANEL -->

<div style="
max-width: 820px;
padding: 28px;
border-radius: 16px;
background: linear-gradient(145deg, rgba(255,179,193,0.08), rgba(209,213,219,0.08));
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.08);
">

<p style="font-size: 15px; line-height: 1.7;">
mdnote is designed for speed, reliability, and simplicity. It delivers a focused writing experience while ensuring your data remains accessible in offline and low-resource environments.
</p>

</div>

<br/>
<br/>

<h3>Core Principles</h3>

<table>
<tr><td><b>Offline-first</b></td><td>Works without internet after initial load</td></tr>
<tr><td><b>Zero setup</b></td><td>Runs directly via a single HTML file</td></tr>
<tr><td><b>Lightweight</b></td><td>No frameworks or dependencies</td></tr>
<tr><td><b>Resilient</b></td><td>Storage fallback prevents data loss</td></tr>
<tr><td><b>Fast</b></td><td>Instant load and minimal latency</td></tr>
<tr><td><b>Maintainable</b></td><td>Modular and clean architecture</td></tr>
</table>

<br/>

<h3>Feature Set</h3>

<table>
<tr><td><b>Notes</b></td><td>Create, edit, delete notes</td></tr>
<tr><td><b>Storage</b></td><td>IndexedDB with localStorage fallback</td></tr>
<tr><td><b>Autosave</b></td><td>Debounced autosave (300ms)</td></tr>
<tr><td><b>Versioning</b></td><td>Stores last 5 versions</td></tr>
<tr><td><b>Markdown</b></td><td>Live rendering</td></tr>
<tr><td><b>Import / Export</b></td><td>.md support</td></tr>
<tr><td><b>UI</b></td><td>Dock-based minimal interface</td></tr>
<tr><td><b>Navigation</b></td><td>Compact history system</td></tr>
<tr><td><b>Personalization</b></td><td>Theme and fonts</td></tr>
</table>

<br/>

<h3>Quick Start</h3>

<pre>
Open index.html
</pre>

<pre>
python3 -m http.server 8080
npx serve . -l 8080
php -S 0.0.0.0:8080
</pre>

<br/>

<h3>Container</h3>

<pre>
docker build -t mdnote:latest .
docker run --rm -p 8080:8080 mdnote
</pre>

<br/>

<h3>Keyboard</h3>

<table>
<tr><td>Ctrl / Cmd + S</td><td>Force save</td></tr>
<tr><td>Ctrl / Cmd + N</td><td>New note</td></tr>
</table>

<br/>

<h3>Architecture</h3>

<table>
<tr><td>index.html</td><td>Application shell</td></tr>
<tr><td>css/style.css</td><td>Layout and theming</td></tr>
<tr><td>js/app.js</td><td>Core logic</td></tr>
<tr><td>js/storage.js</td><td>Persistence layer</td></tr>
<tr><td>js/editor.js</td><td>Markdown processing</td></tr>
<tr><td>js/ui.js</td><td>UI rendering</td></tr>
</table>

<br/>

<h3>Philosophy</h3>

<p style="max-width: 720px;">
mdnote prioritizes independence, simplicity, and longevity. It is built to remain usable regardless of connectivity or infrastructure constraints.
</p>

<br/>

<div style="width: 80px; height: 3px; border-radius: 999px; background: linear-gradient(90deg, #ffb3c1, #d1d5db);"></div>

<br/>

<p>
MIT License
</p>

<p>
https://github.com/abdbali/mdnote.git
</p>

<br/>

<p style="opacity:0.7;">
mdnote — Fast. Offline. Minimal.
</p>

</div>
