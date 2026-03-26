# Markdown Notes (Offline + Minimal Premium)

Tarayıcıda tamamen offline çalışan, sade ve premium görünümlü Markdown not uygulaması.

## Öne Çıkanlar

- Not oluştur / düzenle / sil
- IndexedDB + localStorage fallback
- 300ms autosave
- Her not için son 5 sürüm saklama
- Canlı Markdown önizleme
- Başlık/içerik/etiket araması
- Güncelleme veya başlığa göre sıralama
- `.md` içe aktar / dışa aktar
- Koyu/Açık tema
- Not editörü için 3 font seçeneği:
  - Inter/System
  - Serif Premium
  - Mono Focus
- Her açılışta değişen 2-3 kelimelik motive edici karşılama
- Klavye kısa yolları:
  - `Ctrl/Cmd + S`: hemen kaydet
  - `Ctrl/Cmd + N`: yeni not

## Çalıştırma

1. Projeyi indir.
2. `index.html` dosyasını çift tıklayarak aç.
3. Uygulamayı doğrudan kullan.

## Dosya Yapısı

- `index.html`: Uygulama iskeleti
- `css/style.css`: Minimal premium tema + responsive düzen
- `js/storage.js`: Kalıcılık katmanı
- `js/editor.js`: Markdown render / word count
- `js/ui.js`: UI render yardımcıları
- `js/app.js`: Uygulama akışı ve event yönetimi
- `js/vendor/marked.min.js`: Offline markdown parser
