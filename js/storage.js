const DB_NAME = 'mdnotes-db';
const DB_VERSION = 1;
const STORE_NAME = 'notes';

const fallback = {
  key: 'mdnotes-local-fallback',
  read() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },
  write(notes) {
    localStorage.setItem(this.key, JSON.stringify(notes));
  },
};

export class StorageService {
  constructor() {
    this.db = null;
    this.hasIndexedDB = 'indexedDB' in window;
  }

  async init() {
    if (!this.hasIndexedDB) return;
    try {
      this.db = await this.#openDb();
    } catch {
      this.db = null;
    }
  }

  async getAllNotes() {
    if (!this.db) return fallback.read();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async upsertNote(note) {
    if (!this.db) {
      const notes = fallback.read();
      const idx = notes.findIndex((n) => n.id === note.id);
      if (idx >= 0) notes[idx] = note;
      else notes.push(note);
      fallback.write(notes);
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(note);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async deleteNote(id) {
    if (!this.db) {
      const notes = fallback.read().filter((n) => n.id !== id);
      fallback.write(notes);
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  #openDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
