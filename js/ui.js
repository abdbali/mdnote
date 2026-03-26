(function (global) {
  function UI(elements) {
    this.el = elements;
  }

  UI.prototype.renderList = function renderList(notes, activeId, snippetFn) {
    if (!notes.length) {
      this.el.notesList.innerHTML = '<p class="note-meta">Henüz not yok.</p>';
      return;
    }

    this.el.notesList.innerHTML = notes
      .map((note) => {
        const active = note.id === activeId ? 'active' : '';
        const firstTag = (note.tags || [])[0];
        const tags = firstTag ? `#${escapeHtml(firstTag)}` : 'etiket yok';
        return `
          <div class="note-item ${active}" data-id="${note.id}">
            <div class="note-title">${escapeHtml(note.title || 'Untitled')}</div>
            <div class="note-snippet">${escapeHtml(firstLine(snippetFn(note.content || '')))}</div>
            <div class="note-meta">${tags || 'etiket yok'}</div>
          </div>
        `;
      })
      .join('');
  };

  UI.prototype.hydrate = function hydrate(note) {
    this.el.titleInput.value = note ? note.title : '';
    this.el.tagsInput.value = note ? (note.tags || []).join(', ') : '';
    this.el.contentInput.value = note ? note.content : '';
  };

  UI.prototype.status = function status({ save, words, edited, versions }) {
    this.el.autosaveStatus.textContent = save;
    this.el.wordCount.textContent = `${words} kelime`;
    this.el.lastEdited.textContent = edited;
    this.el.versionInfo.textContent = `Sürüm: ${versions}`;
  };


  function firstLine(str) {
    return String(str).split(/\r?\n/)[0].trim();
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  global.MDUI = UI;
})(window);
