# Aplikasi Catatan Pribadi

Single Page Application (SPA)-catatan pribadi yang dibangun menggunakan **React** dan
**React Router**. Seluruh data catatan disimpan di memori modul sehingga
**data akan hilang ketika browser di-refresh**.

## Menjalankan Aplikasi

```bash
npm install
npm run dev
```

Aplikasi dapat diakses pada `http://localhost:5173`.

Untuk membuat versi production:

```bash
npm run build
npm run preview
```

## Daftar Route

| Route              | Halaman                                        | Keterangan                          |
| ------------------ | ---------------------------------------------- | ----------------------------------- |
| `/`                | Daftar Catatan Aktif                           | Default route, menampilkan initial data. |
| `/archived`        | Daftar Catatan Terarsip                        | Menampilkan "Arsip kosong" bila kosong. |
| `/notes/new`       | Form Tambah Catatan Baru                       | Controlled component + contentEditable. |
| `/notes/:id`       | Detail Catatan                                 | Mengambil `id` dari path parameter. |
| `/notes/:id/edit`  | Form Ubah Catatan                              | Pre-fill form dari catatan terpilih. |
| `*`                | Halaman 404                                    | Ditampilkan untuk URL yang tidak dikenal. |

Halaman detail (`/notes/:id`) dapat diakses langsung melalui URL maupun dengan
mengklik kartu catatan pada halaman daftar.

## Fitur

### Kriteria Utama

1. **Minimal 2 halaman berbeda** — daftar catatan dan detail catatan, navigated
   dengan `<Link>`, `<NavLink>`, dan `useNavigate()` tanpa full page reload.
2. **Daftar catatan** — menampilkan `title`, `createdAt`, dan `body` dari initial
   data, disertai conditional rendering pesan "Tidak ada catatan".
3. **Detail catatan** — menampilkan catatan tunggal sesuai `id` pada path parameter,
   dapat diakses langsung melalui URL.
4. **Menambah catatan** — form dengan controlled component pada `title` dan elemen
   `contentEditable` pada `body`, hasilnya langsung diarahkan ke halaman detail.
5. **Menghapus catatan** — tombol hapus dengan konfirmasi, tersedia pada halaman detail.

### Kriteria Opsional

1. **Arsip Catatan** — halaman `/archived` plus tombol arsip/batal arsip pada
   halaman detail catatan.
2. **Pencarian Catatan** — pencarian berdasarkan judul memakai search parameter
   (`?q=...`) sehingga dapat dibagikan melalui URL, dengan controlled component.
3. **Halaman 404** — halaman khusus untuk URL yang tidak dikenal.

### Tambahan

- **Ubah catatan** pada `/notes/:id/edit`.
- **Rich text** — isi catatan disimpan sebagai HTML (bukan plain text) dan dirender
  menggunakan package `html-react-parser`.
- **Ringkasan (excerpt)** pada kartu catatan agar judul dan isi tetap terbaca rapi.

## Struktur Folder

```
src
├── components      # React Component yang dapat digunakan ulang
│   ├── FloatingLink.jsx
│   ├── FormattedDate.jsx
│   ├── Navigation.jsx
│   ├── NoteBody.jsx
│   ├── NoteEditor.jsx
│   ├── NoteItem.jsx
│   ├── NoteList.jsx
│   └── SearchBar.jsx
├── hooks           # Custom hook
│   └── useNotesStore.js
├── pages           # Komponen yang berperan sebagai halaman aplikasi
│   ├── AddNotePage.jsx
│   ├── ArchivePage.jsx
│   ├── DetailPage.jsx
│   ├── EditNotePage.jsx
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
├── styles          # Berkas CSS
│   └── style.css
├── utils           # Fungsi reusable & pengelolaan data lokal
│   ├── index.js
│   └── local-data.js
├── App.jsx         # Komponen aplikasi & definisi route
└── index.jsx       # Berkas entrance utama aplikasi
```

## Catatan Teknis

- Seluruh komponen menggunakan **function component** dan `hook` (tidak ada class
  component karena tidak membutuhkan `state`/lifecycle).
- Data catatan dikelola melalui `src/utils/local-data.js`. Karena data disimpan di
  memori modul, hook `useNotesStore` (di `src/hooks/useNotesStore.js`) membungkus
  fungsi-fungsi mutasi dan memaksa render ulang setiap kali data berubah.
- Penulisan kode menggunakan **single quote**, indentasi 2 spasi, dan **semicolon**
  di akhir statement.