(function () {
  const MOODS = ['Calm Progress', 'Steady Energy', 'Focused Flow', 'Quiet Confidence', 'One Step Ahead'];
  const GREETINGS = {
    morning: ['Good morning', 'Morning', 'Hi there', 'Hello', 'Hey'],
    afternoon: ['Good afternoon', 'Hi there', 'Hello', 'Hey', 'Hi'],
    evening: ['Good evening', 'Evening', 'Hi there', 'Hello', 'Hey'],
    night: ['Good night', 'Late hello', 'Hi there', 'Hello', 'Hey'],
  };
  const PROMPTS = [
    'How are you feeling today?',
    'What is on your mind today?',
    'What would make today great?',
    'What do you want to capture right now?',
    'What are you grateful for today?',
  ];
  const THEME_KEY = 'mdnotes-theme';
  const FONT_KEY = 'mdnotes-editor-font';

  const el = {
    greetingText: document.getElementById('greetingText'),
    historyToggle: document.getElementById('historyToggle'),
    historyDrawer: document.getElementById('historyDrawer'),
    notesList: document.getElementById('notesList'),
    newNoteBtn: document.getElementById('newNoteBtn'),
    deleteBtn: document.getElementById('deleteBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importInput: document.getElementById('importInput'),
    titleInput: document.getElementById('titleInput'),
    contentInput: document.getElementById('contentInput'),
    tagsInput: document.getElementById('tagsInput'),
    preview: document.getElementById('preview'),
    previewPane: document.getElementById('previewPane'),
    previewToggle: document.getElementById('previewToggle'),
    plusBtn: document.getElementById('plusBtn'),
    insertHeadingBtn: document.getElementById('insertHeadingBtn'),
    insertListBtn: document.getElementById('insertListBtn'),
    insertCodeBtn: document.getElementById('insertCodeBtn'),
    searchInput: document.getElementById('searchInput'),
    sortSelect: document.getElementById('sortSelect'),
    themeToggle: document.getElementById('themeToggle'),
    fontSelect: document.getElementById('fontSelect'),
    autosaveStatus: document.getElementById('autosaveStatus'),
    wordCount: document.getElementById('wordCount'),
    lastEdited: document.getElementById('lastEdited'),
    versionInfo: document.getElementById('versionInfo'),
    expandPane: document.getElementById('expandPane'),
    contentMirror: document.getElementById('contentMirror'),
    expandClose: document.getElementById('expandClose'),
  };

  const storage = new window.MDStorage();
  const editor = new window.MDEditor(el.preview);
  const ui = new window.MDUI(el);

  const state = { notes: [], activeId: null, saveTimer: null, previewVisible: false, syncingMirror: false };

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    applyGreeting();
    applyTheme();
    applyEditorFont();
    applyRandomPrompt();

    await storage.init();
    state.notes = await storage.getAllNotes();

    if (!state.notes.length) {
      await createNote({ title: 'Yeni Not', content: '# Hoş geldin\n\nBuraya direkt chat gibi yazabilirsin.' });
    }

    state.activeId = state.notes[0].id;
    bindEvents();
    refresh();
  }

  function bindEvents() {
    el.newNoteBtn.addEventListener('click', () => createNote());
    el.deleteBtn.addEventListener('click', onDelete);
    el.exportBtn.addEventListener('click', onExport);
    el.importBtn.addEventListener('click', () => el.importInput.click());
    el.importInput.addEventListener('change', onImport);
    el.searchInput.addEventListener('input', refresh);
    el.sortSelect.addEventListener('change', refresh);
    el.themeToggle.addEventListener('click', toggleTheme);
    el.fontSelect.addEventListener('change', onFontChange);
    el.previewToggle.addEventListener('click', togglePreview);
    el.plusBtn.addEventListener('click', () => createNote());
    el.insertHeadingBtn.addEventListener('click', () => insertAtCursor('# '));
    el.insertListBtn.addEventListener('click', () => insertAtCursor('- '));
    el.insertCodeBtn.addEventListener('click', () => insertAtCursor('```\n\n```'));
    el.historyToggle.addEventListener('click', () => el.historyDrawer.classList.toggle('open'));
    el.expandClose.addEventListener('click', closeExpandPane);

    ['input', 'change'].forEach((evt) => {
      el.titleInput.addEventListener(evt, queueSave);
      el.tagsInput.addEventListener(evt, queueSave);
      el.contentInput.addEventListener(evt, queueSave);
    });

    el.contentMirror.addEventListener('input', onMirrorInput);

    el.notesList.addEventListener('click', (e) => {
      const item = e.target.closest('.note-item');
      if (!item) return;
      state.activeId = item.dataset.id;
      el.historyDrawer.classList.remove('open');
      refresh();
    });

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      if (key === 's') {
        e.preventDefault();
        persist().then(setSavedStatus);
      }
      if (key === 'n') {
        e.preventDefault();
        createNote();
      }
    });
  }

  function refresh() {
    const query = el.searchInput.value.trim().toLowerCase();
    const sort = el.sortSelect.value;

    const filtered = state.notes
      .filter((n) => {
        if (!query) return true;
        return `${n.title} ${n.content} ${(n.tags || []).join(' ')}`.toLowerCase().includes(query);
      })
      .sort((a, b) => sortNotes(a, b, sort));

    if (!filtered.some((n) => n.id === state.activeId)) {
      state.activeId = filtered[0] ? filtered[0].id : null;
    }

    ui.renderList(filtered, state.activeId, editor.snippet.bind(editor));
    const active = getActive();
    ui.hydrate(active);
    editor.render(active ? active.content : '');

    ui.status({
      save: 'Hazır',
      words: editor.wordCount(active ? active.content : ''),
      edited: active ? `Son düzenleme: ${new Date(active.updated_at).toLocaleString('tr-TR')}` : 'Henüz düzenlenmedi',
      versions: active && active.versions ? active.versions.length : 0,
    });

    el.previewPane.classList.toggle('hidden', !state.previewVisible);
    const previewLabel = el.previewToggle.querySelector('em');
    if (previewLabel) previewLabel.textContent = state.previewVisible ? 'Önizleme Gizle' : 'Önizleme';
    syncMirrorFromMain();
    evaluateExpansion();
  }

  function getActive() {
    return state.notes.find((n) => n.id === state.activeId) || null;
  }

  function queueSave() {
    ui.status({
      save: 'Kaydediliyor...',
      words: editor.wordCount(el.contentInput.value),
      edited: 'Yazılıyor...',
      versions: getActive() && getActive().versions ? getActive().versions.length : 0,
    });

    editor.render(el.contentInput.value);

    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      persist().then(setSavedStatus);
    }, 300);
  }

  async function persist() {
    const note = getActive();
    if (!note) return;

    const title = el.titleInput.value.trim() || 'Untitled';
    const content = el.contentInput.value;
    const tags = el.tagsInput.value.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 12);
    const hasChanged = note.title !== title || note.content !== content || JSON.stringify(note.tags) !== JSON.stringify(tags);

    if (hasChanged && note.content) {
      note.versions = [{ title: note.title, content: note.content, tags: note.tags, updated_at: note.updated_at }, ...(note.versions || [])].slice(0, 5);
    }

    note.title = title;
    note.content = content;
    note.tags = tags;
    note.updated_at = Date.now();
    await storage.upsertNote(note);
  }

  async function createNote(seed = {}) {
    const now = Date.now();
    const note = {
      id: crypto.randomUUID(),
      title: seed.title || 'Untitled',
      content: seed.content || '',
      tags: seed.tags || [],
      created_at: now,
      updated_at: now,
      versions: [],
    };

    state.notes.unshift(note);
    state.activeId = note.id;
    await storage.upsertNote(note);
    applyRandomPrompt();
    refresh();
  }

  async function onDelete() {
    const note = getActive();
    if (!note) return;
    if (!confirm(`"${note.title}" silinsin mi?`)) return;

    await storage.deleteNote(note.id);
    state.notes = state.notes.filter((n) => n.id !== note.id);
    if (!state.notes.length) await createNote();
    state.activeId = state.notes[0].id;
    refresh();
  }

  function onExport() {
    const note = getActive();
    if (!note) return;
    const text = `# ${note.title}\n\n${note.content}`;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(note.title)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function onImport(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const text = await file.text();
    await createNote({ title: file.name.replace(/\.md$/i, ''), content: text });
    e.target.value = '';
  }

  function sortNotes(a, b, mode) {
    if (mode === 'updated_asc') return a.updated_at - b.updated_at;
    if (mode === 'title_asc') return a.title.localeCompare(b.title, 'tr');
    if (mode === 'title_desc') return b.title.localeCompare(a.title, 'tr');
    return b.updated_at - a.updated_at;
  }

  function setSavedStatus() {
    const active = getActive();
    refresh();
    ui.status({
      save: 'Kaydedildi',
      words: editor.wordCount(active ? active.content : ''),
      edited: active ? `Son düzenleme: ${new Date(active.updated_at).toLocaleString('tr-TR')}` : 'Henüz düzenlenmedi',
      versions: active && active.versions ? active.versions.length : 0,
    });
  }

  function togglePreview() {
    state.previewVisible = !state.previewVisible;
    refresh();
  }

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
  }

  function applyTheme() {
    document.documentElement.dataset.theme = localStorage.getItem(THEME_KEY) || 'dark';
  }

  function onFontChange() {
    applyEditorFont(el.fontSelect.value);
    localStorage.setItem(FONT_KEY, el.fontSelect.value);
  }

  function applyEditorFont(explicit) {
    const fontClass = explicit || localStorage.getItem(FONT_KEY) || 'font-sans';
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    document.body.classList.add(fontClass);
    el.fontSelect.value = fontClass;
  }

  function applyGreeting() {
    const hour = new Date().getHours();
    const bucket = hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : hour >= 18 && hour < 23 ? 'evening' : 'night';
    const greetPool = GREETINGS[bucket];
    const greet = greetPool[Math.floor(Math.random() * greetPool.length)];
    const mood = MOODS[Math.floor(Math.random() * MOODS.length)];
    el.greetingText.innerHTML = `<span>*</span> ${greet}, ${mood}`;
  }

  function applyRandomPrompt() {
    el.contentInput.placeholder = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  }

  function insertAtCursor(snippet) {
    const ta = el.contentInput;
    const start = ta.selectionStart || 0;
    const end = ta.selectionEnd || 0;
    const value = ta.value;
    ta.value = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
    ta.focus();
    const nextPos = start + snippet.length;
    ta.setSelectionRange(nextPos, nextPos);
    queueSave();
  }


  function evaluateExpansion() {
    const lineCount = (el.contentInput.value.match(/\n/g) || []).length + 1;
    if (lineCount >= 8) openExpandPane();
    else closeExpandPane();
  }

  function openExpandPane() {
    el.expandPane.classList.add('open');
    document.body.classList.add('focus-mode');
    syncMirrorFromMain();
  }

  function closeExpandPane() {
    el.expandPane.classList.remove('open');
    document.body.classList.remove('focus-mode');
  }

  function syncMirrorFromMain() {
    if (state.syncingMirror) return;
    state.syncingMirror = true;
    el.contentMirror.value = el.contentInput.value;
    state.syncingMirror = false;
  }

  function onMirrorInput() {
    if (state.syncingMirror) return;
    state.syncingMirror = true;
    el.contentInput.value = el.contentMirror.value;
    state.syncingMirror = false;
    queueSave();
  }

  function slugify(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'note';
  }
})();
