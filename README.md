# Aplikasi Catatan Pribadi (React + RESTful API)

Single Page Application (SPA) catatan pribadi yang dibangun menggunakan **React**,
**React Router**, dan **RESTful API** [notes-api.dicoding.dev/v1](https://notes-api.dicoding.dev/v1)
sebagai satu-satunya sumber data.

## Menjalankan Aplikasi

```bash
npm install
npm run dev
```

Aplikasi dapat diakses pada `http://localhost:5173`.

Memeriksa mutu kode dengan ESLint:

```bash
npm run lint
```

Untuk membuat versi production:

```bash
npm run build
npm run preview
```

## Daftar Route

| Route            | Halaman              | Keterangan                                        |
| ---------------- | -------------------- | ------------------------------------------------- |
| `/login`         | Login pengguna       | Hanya untuk pengguna belum terautentikasi.         |
| `/register`      | Registrasi pengguna  | Hanya untuk pengguna belum terautentikasi.         |
| `/`              | Daftar catatan aktif | Menarik data dari `GET /notes`.                   |
| `/archives`      | Daftar catatan arsip | Menarik data dari `GET /notes/archived`.           |
| `/notes/new`     | Tambah catatan       | `POST /notes`.                                    |
| `/notes/:id`     | Detail catatan       | `GET /notes/:id`, hapus (`DELETE`) & arsip/batal arsip. |
| `*`              | Halaman 404          | Ditampilkan untuk URL yang tidak dikenal.         |

Bila pengguna belum autentikasi, seluruh route diarahkan ke halaman login sehingga
fitur catatan hanya dapat diakses oleh pengguna yang sudah masuk.

## Fitur

### Kriteria Utama

1. **RESTful API sebagai sumber data** — seluruh data catatan diambil/diubah melalui
   `src/utils/network-data.js` (login, register, profil, daftar catatan, catatan
   terarsip, detail, arsip/batal arsip, dan hapus catatan).
2. **Registrasi & autentikasi** — halaman `/register` (nama, email, password,
   konfirmasi password) dan `/login` (email, password). Access token disimpan pada
   `localStorage`, data pengguna (nama & email) disimpan pada state `App` dan
   ditampilkan pada navigasi, disertai tombol **Logout**.
3. **Fitur catatan terproteksi** — daftar, detail, tambah, arsip, dan hapus catatan
   hanya dirender setelah pengguna terautentikasi; selain itu hanya halaman
   login/registrasi yang dapat diakses.
4. **Ubah tema** — tombol gelap/terang pada navigasi, memakai `ThemeContext`, dan
   perubahannya persisten di `localStorage` (`theme`).
5. **Menggunakan Hooks** — `useState`, `useEffect`, `useMemo`, `useCallback`,
   `useContext`, `useSearchParams`, custom hooks (`useInput`, `useNotes`,
   `useNote`, `useTranslate`) dipakai, termasuk pada halaman registrasi & login.
6. **Kriteria submission sebelumnya** — minimal 2 halaman (daftar & detail),
   menambah dan menghapus catatan, halaman 404, pencarian via query parameter.

### Kriteria Opsional

1. **Indikasi loading** — spinner + label "Memuat data..." saat mengambil data API,
   tombol disabled berlabel "Memproses..."/"Menyimpan..." selama request berjalan.
2. **Fitur ubah bahasa** — tombol ID/EN pada navigasi, memakai `LocaleContext`,
   perubahan tersimpan di `localStorage` (`locale`), dan seluruh teks UI dikelola
   pada `src/utils/translations.js` melalui custom hook `useTranslate`.

## Struktur Folder

```
src
├── components      # Komponen presentasional yang dapat digunakan ulang
│   ├── FloatingLink.jsx
│   ├── FormattedDate.jsx
│   ├── Loadingtemp.jsx
│   ├── Navigation.jsx
│   ├── NoteBody.jsx
│   ├── NoteEditor.jsx
│   ├── NoteItem.jsx
│   ├── NoteList.jsx
│   └── SearchBar.jsx
├── contexts        # React Context (tema & bahasa)
│   ├── LocaleContext.js
│   └── ThemeContext.js
├── hooks           # Custom hooks
│   ├── useInput.js       # State controlled input
│   ├── useNote.js        # Fetch satu catatan (detail)
│   ├── useNotes.js       # Fetch daftar catatan (aktif/arsip)
│   └── useTranslate.js   # Terjemahan teks UI sesuai locale
├── pages           # Halaman aplikasi
│   ├── AddNotePage.jsx
│   ├── ArchivePage.jsx
│   ├── DetailPage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   └── RegisterPage.jsx
├── styles
│   └── style.css
├── utils
│   ├── index.js           # Helper (format tanggal, excerpt, pencarian)
│   ├── network-data.js    # Transaksi dengan RESTful API
│   └── translations.js    # Kamus teks ID & EN
├── App.jsx         # Komponen aplikasi, proteksi route, context provider
└── index.jsx       # Berkas entrance utama aplikasi
```

## Catatan Teknis

- Seluruh komponen menggunakan **function component** + hooks (tidak ada class
  component karena tidak membutuhkan state/lifecycle khusus).
- Logika pengambilan data yang berulang diekstrak ke custom hook `useNotes` dan
  `useNote`, sedangkan logika controlled input diekstrak ke `useInput`.
- UI dipecah menjadi komponen kecil (`NoteList`, `NoteItem`, `NoteEditor`,
  `NoteBody`, `SearchBar`, `Loading`, `FloatingLink`).
- Gaya penulisan kode konsisten: **single quote**, indentasi **2 spasi**, dan
  **semicolon** di akhir statement.
- Komponen yang menerima props dilengkapi `propTypes` untuk validasi props.
- ESLint terkonfigurasi pada `eslint.config.js` (plugin `react-hooks` + aturan
  gaya penulisan: single quote, indentasi 2 spasi, semicolon, trailing comma).
