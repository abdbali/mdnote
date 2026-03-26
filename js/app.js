import { StorageService } from './storage.js';
import { EditorService } from './editor.js';
import { UIService } from './ui.js';

const el = {
  notesList: document.getElementById('notesList'),
  noteCount: document.getElementById('noteCount'),
  newNoteBtn: document.getElementById('newNoteBtn'),
  deleteBtn: document.getElementById('deleteBtn'),
  exportBtn: document.getElementById('exportBtn'),
  importBtn: document.getElementById('importBtn'),
  importInput: document.getElementById('importInput'),
  titleInput: document.getElementById('titleInput'),
  contentInput: document.getElementById('contentInput'),
  tagsInput: document.getElementById('tagsInput'),
  preview: document.getElementById('preview'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  themeToggle: document.getElementById('themeToggle'),
  autosaveStatus: document.getElementById('autosaveStatus'),
  wordCount: document.getElementById('wordCount'),
  lastEdited: document.getElementById('lastEdited'),
  versionInfo: document.getElementById('versionInfo'),
};

const storage = new StorageService();
const editor = new EditorService({ previewEl: el.preview, contentEl: el.contentInput, marked: window.marked });
const ui = new UIService(el);

const state = {
  notes: [],
  filtered: [],
  activeId: null,
  saveTimer: null,
  activeAutosave: false,
};

const THEME_KEY = 'mdnotes-theme';

await bootstrap();

async function bootstrap() {
  applyStoredTheme();
  await storage.init();
  state.notes = await storage.getAllNotes();

  if (!state.notes.length) {
    await createNote({ title: 'Welcome', content: '# Welcome to Markdown Notes\n\nStart typing and your notes save automatically.' });
  }

  state.activeId = state.notes[0]?.id || null;

  bindEvents();
  refresh();
}

function bindEvents() {
  el.newNoteBtn.addEventListener('click', () => createNote());
  el.deleteBtn.addEventListener('click', onDeleteNote);
  el.exportBtn.addEventListener('click', onExportNote);
  el.importBtn.addEventListener('click', () => el.importInput.click());
  el.importInput.addEventListener('change', onImportFile);

  ['input', 'change'].forEach((evt) => {
    el.titleInput.addEventListener(evt, queueSave);
    el.contentInput.addEventListener(evt, queueSave);
    el.tagsInput.addEventListener(evt, queueSave);
  });

  el.searchInput.addEventListener('input', refresh);
  el.sortSelect.addEventListener('change', refresh);

  el.notesList.addEventListener('click', (event) => {
    const card = event.target.closest('.note-item');
    if (!card) return;
    state.activeId = card.dataset.id;
    refresh();
  });

  document.addEventListener('keydown', async (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;

    if (event.key.toLowerCase() === 's') {
      event.preventDefault();
      await persistActiveNote();
      flashSaved();
    }

    if (event.key.toLowerCase() === 'n') {
      event.preventDefault();
      await createNote();
    }
  });

  el.themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    el.themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  });
}

function getActiveNote() {
  return state.notes.find((n) => n.id === state.activeId) || null;
}

function refresh() {
  const query = el.searchInput.value.trim().toLowerCase();
  const sortBy = el.sortSelect.value;

  state.filtered = state.notes
    .filter((note) => {
      if (!query) return true;
      const tags = (note.tags || []).join(' ');
      return `${note.title} ${note.content} ${tags}`.toLowerCase().includes(query);
    })
    .sort((a, b) => sortNotes(a, b, sortBy));

  if (!state.filtered.some((n) => n.id === state.activeId) && state.filtered[0]) {
    state.activeId = state.filtered[0].id;
  }

  ui.renderNotesList(state.filtered, state.activeId, editor.getSnippet.bind(editor));

  const active = getActiveNote();
  ui.hydrateEditor(active);
  editor.render(active?.content || '');

  ui.updateStatus({
    autosaveText: state.activeAutosave ? 'Saving…' : 'Idle',
    autosaveClass: state.activeAutosave ? 'status-saving' : 'status-idle',
    words: editor.wordCount(active?.content || ''),
    lastEdited: active ? `Last edited ${new Date(active.updated_at).toLocaleString()}` : 'Not edited yet',
    versions: active?.versions?.length || 0,
  });
}

function queueSave() {
  state.activeAutosave = true;
  ui.updateStatus({
    autosaveText: 'Saving…',
    autosaveClass: 'status-saving',
    words: editor.wordCount(el.contentInput.value),
    lastEdited: 'Typing…',
    versions: getActiveNote()?.versions?.length || 0,
  });

  editor.render(el.contentInput.value);

  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(async () => {
    await persistActiveNote();
    flashSaved();
  }, 300);
}

async function persistActiveNote() {
  const note = getActiveNote();
  if (!note) return;

  const title = el.titleInput.value.trim() || 'Untitled';
  const content = el.contentInput.value;
  const tags = el.tagsInput.value
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 10);

  const oldSnapshot = { title: note.title, content: note.content, tags: note.tags, updated_at: note.updated_at };
  const changed = oldSnapshot.title !== title || oldSnapshot.content !== content || JSON.stringify(oldSnapshot.tags) !== JSON.stringify(tags);

  if (changed && oldSnapshot.content) {
    note.versions = [
      {
        title: oldSnapshot.title,
        content: oldSnapshot.content,
        tags: oldSnapshot.tags,
        updated_at: oldSnapshot.updated_at,
      },
      ...(note.versions || []),
    ].slice(0, 5);
  }

  note.title = title;
  note.content = content;
  note.tags = tags;
  note.updated_at = Date.now();

  await storage.upsertNote(note);
  refresh();
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
  refresh();
}

async function onDeleteNote() {
  const note = getActiveNote();
  if (!note) return;
  if (!confirm(`Delete "${note.title}"?`)) return;

  await storage.deleteNote(note.id);
  state.notes = state.notes.filter((n) => n.id !== note.id);
  state.activeId = state.notes[0]?.id || null;

  if (!state.notes.length) {
    await createNote();
    return;
  }
  refresh();
}

function onExportNote() {
  const note = getActiveNote();
  if (!note) return;

  const header = `---\ntitle: ${note.title}\ntags: ${(note.tags || []).join(', ')}\nupdated_at: ${new Date(note.updated_at).toISOString()}\n---\n\n`;
  const blob = new Blob([header + note.content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slugify(note.title)}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

async function onImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  const title = file.name.replace(/\.md$/i, '') || 'Imported note';
  await createNote({ title, content: text });
  event.target.value = '';
}

function sortNotes(a, b, mode) {
  switch (mode) {
    case 'updated_asc':
      return a.updated_at - b.updated_at;
    case 'title_asc':
      return a.title.localeCompare(b.title);
    case 'title_desc':
      return b.title.localeCompare(a.title);
    case 'updated_desc':
    default:
      return b.updated_at - a.updated_at;
  }
}

function flashSaved() {
  state.activeAutosave = false;
  const note = getActiveNote();
  ui.updateStatus({
    autosaveText: 'Saved',
    autosaveClass: 'status-saved',
    words: editor.wordCount(note?.content || ''),
    lastEdited: note ? `Last edited ${new Date(note.updated_at).toLocaleString()}` : 'Not edited yet',
    versions: note?.versions?.length || 0,
  });
}

function applyStoredTheme() {
  const theme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.dataset.theme = theme;
  el.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'note';
}
