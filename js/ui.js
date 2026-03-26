function timeAgo(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export class UIService {
  constructor(elements) {
    this.el = elements;
  }

  renderNotesList(notes, activeId, snippetFn) {
    const { notesList, noteCount } = this.el;
    noteCount.textContent = String(notes.length);

    if (!notes.length) {
      notesList.innerHTML = `<p class="text-body-secondary small mt-3">No notes yet. Create one with <kbd>Ctrl</kbd>+<kbd>N</kbd>.</p>`;
      return;
    }

    notesList.innerHTML = notes
      .map((note) => {
        const active = note.id === activeId ? 'active' : '';
        const tagHtml = (note.tags || [])
          .slice(0, 3)
          .map((t) => `<span class="badge rounded-pill text-bg-secondary me-1">#${t}</span>`)
          .join('');

        return `
          <article class="note-item ${active}" data-id="${note.id}">
            <div class="note-title text-truncate">${escapeHtml(note.title || 'Untitled')}</div>
            <div class="note-snippet mt-1">${escapeHtml(snippetFn(note.content || ''))}</div>
            <div class="mt-2">${tagHtml}</div>
            <div class="note-meta mt-2">Updated ${timeAgo(note.updated_at)}</div>
          </article>
        `;
      })
      .join('');
  }

  hydrateEditor(note) {
    this.el.titleInput.value = note?.title || '';
    this.el.contentInput.value = note?.content || '';
    this.el.tagsInput.value = (note?.tags || []).join(', ');
  }

  updateStatus({ autosaveText, autosaveClass, words, lastEdited, versions }) {
    this.el.autosaveStatus.textContent = autosaveText;
    this.el.autosaveStatus.className = `status-pill ${autosaveClass}`;
    this.el.wordCount.textContent = `${words} word${words === 1 ? '' : 's'}`;
    this.el.lastEdited.textContent = lastEdited;
    this.el.versionInfo.textContent = `Version history: ${versions}`;
  }
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
