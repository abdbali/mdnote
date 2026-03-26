export class EditorService {
  constructor({ previewEl, contentEl, marked }) {
    this.previewEl = previewEl;
    this.contentEl = contentEl;
    this.marked = marked;

    this.marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false,
    });
  }

  render(content) {
    this.previewEl.innerHTML = this.marked.parse(content || '');
  }

  wordCount(text) {
    const trimmed = (text || '').trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  getSnippet(text, len = 100) {
    const cleaned = (text || '').replace(/[#>*_`\-\[\]]/g, '').replace(/\s+/g, ' ').trim();
    return cleaned.length > len ? `${cleaned.slice(0, len)}…` : cleaned;
  }
}
