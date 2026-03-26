<div align="center">

<h1>mdnote</h1>

<p>
A fully offline-first Markdown notes application that runs directly in the browser.
</p>

<p>
No build step. No dependencies. No network requirement.
</p>

<br/>

<hr style="width: 60%;"/>

<br/>

<h3>Overview</h3>

<p style="max-width: 720px;">
mdnote is designed for speed, reliability, and simplicity. It provides a focused writing experience while ensuring data accessibility in offline and low-resource environments.
</p>

<br/>

<h3>Core Principles</h3>

<table>
<tr><td><b>Offline-first</b></td><td>Works without internet after initial load</td></tr>
<tr><td><b>Zero setup</b></td><td>Runs directly via a single HTML file</td></tr>
<tr><td><b>Lightweight</b></td><td>No frameworks or heavy dependencies</td></tr>
<tr><td><b>Resilient</b></td><td>Storage fallback prevents data loss</td></tr>
<tr><td><b>Fast</b></td><td>Instant load and minimal latency</td></tr>
<tr><td><b>Maintainable</b></td><td>Clean and modular structure</td></tr>
</table>

<br/>

<h3>Feature Set</h3>

<table>
<tr><td><b>Notes</b></td><td>Create, edit, delete notes</td></tr>
<tr><td><b>Storage</b></td><td>IndexedDB with localStorage fallback</td></tr>
<tr><td><b>Autosave</b></td><td>Debounced autosave (300ms)</td></tr>
<tr><td><b>Versioning</b></td><td>Stores last 5 versions</td></tr>
<tr><td><b>Markdown</b></td><td>Live rendering with embedded parser</td></tr>
<tr><td><b>Import / Export</b></td><td>Full .md support</td></tr>
<tr><td><b>UI</b></td><td>Minimal dock-based interaction</td></tr>
<tr><td><b>Navigation</b></td><td>Compact history drawer</td></tr>
<tr><td><b>Personalization</b></td><td>Theme and font options</td></tr>
</table>

<br/>

<h3>Architecture</h3>

<table>
<tr><td><b>index.html</b></td><td>Application shell</td></tr>
<tr><td><b>css/style.css</b></td><td>Layout and theming</td></tr>
<tr><td><b>js/app.js</b></td><td>Core application logic</td></tr>
<tr><td><b>js/storage.js</b></td><td>Persistence layer</td></tr>
<tr><td><b>js/editor.js</b></td><td>Markdown processing</td></tr>
<tr><td><b>js/ui.js</b></td><td>UI rendering</td></tr>
</table>

<br/>

<h3>Execution</h3>

<p><b>Direct</b></p>

<pre>
Open index.html
</pre>

<p><b>Local Server</b></p>

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

<h3>Data Model</h3>

<table>
<tr><td>id</td><td>Unique identifier</td></tr>
<tr><td>title</td><td>Note title</td></tr>
<tr><td>content</td><td>Markdown content</td></tr>
<tr><td>tags</td><td>Tag array</td></tr>
<tr><td>created_at</td><td>Timestamp</td></tr>
<tr><td>updated_at</td><td>Timestamp</td></tr>
<tr><td>versions</td><td>Last five snapshots</td></tr>
</table>

<br/>

<h3>Platform Support</h3>

<p>
macOS · Windows · Linux · Ubuntu Server · Modern Browsers
</p>

<br/>

<h3>Philosophy</h3>

<p style="max-width: 720px;">
mdnote prioritizes independence, simplicity, and longevity. It is built to remain usable regardless of connectivity or infrastructure.
</p>

<br/>

<hr style="width: 60%;"/>

<br/>

<p>
MIT License
</p>

<p>
https://github.com/abdbali/mdnote.git
</p>

<br/>

<p>
mdnote<br/>
Fast. Offline. Minimal.
</p>

</div>
