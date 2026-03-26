(function (global) {
  function EditorService(previewEl) {
    this.previewEl = previewEl;
    global.marked.setOptions({ breaks: true, gfm: true, headerIds: false, mangle: false });
  }

  EditorService.prototype.render = function render(content) {
    this.previewEl.innerHTML = global.marked.parse(content || '');
  };

  EditorService.prototype.wordCount = function wordCount(text) {
    const t = (text || '').trim();
    return t ? t.split(/\s+/).length : 0;
  };

  EditorService.prototype.snippet = function snippet(text, len = 90) {
    const cleaned = (text || '').replace(/[#>*_`\-\[\]]/g, '').replace(/\s+/g, ' ').trim();
    return cleaned.length > len ? `${cleaned.slice(0, len)}…` : cleaned;
  };

  global.MDEditor = EditorService;
})(window);
