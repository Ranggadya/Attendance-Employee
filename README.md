# Employee Attendance Admin Panel

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Backstrap](https://img.shields.io/badge/Admin_Template-Backstrap-354B4E)](https://backstrap.net/)

Aplikasi admin berbasis React untuk mencatat dan mengelola absensi karyawan.
Aplikasi dapat langsung digunakan tanpa backend karena data disimpan pada
`localStorage` browser.

Repository: [github.com/Ranggadya/Attendance-Employee](https://github.com/Ranggadya/Attendance-Employee)

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Panduan Pengguna](#panduan-pengguna)
- [Perhitungan Statistik](#perhitungan-statistik)
- [Panduan Developer](#panduan-developer)
- [Arsitektur dan Alur Data](#arsitektur-dan-alur-data)
- [Struktur Project](#struktur-project)
- [Menjalankan Project](#menjalankan-project)
- [Mengembangkan Fitur](#mengembangkan-fitur)
- [Production Build dan Deployment](#production-build-dan-deployment)
- [Troubleshooting](#troubleshooting)

## Fitur Utama

- Dashboard statistik absensi hari ini
- Menampilkan daftar data absensi karyawan
- Menambahkan, mengedit, dan menghapus data absensi
- Search berdasarkan nama, alamat, jenis kelamin, atau tanggal
- Filter berdasarkan jenis kelamin dan tanggal absen
- Sort berdasarkan:
  - Nama A-Z atau Z-A
  - Tanggal terbaru atau terlama
  - Jam masuk paling awal atau akhir
  - Jam keluar paling awal atau akhir
- Sorting langsung melalui header tabel
- Pagination, 10 data per halaman
- Validasi form pada sisi client
- Modal konfirmasi sebelum menghapus data
- Layout responsif untuk desktop, tablet, dan mobile
- Penyimpanan otomatis menggunakan `localStorage`

## Panduan Pengguna

Bagian ini ditujukan untuk pengguna yang hanya ingin memakai aplikasi tanpa
mengubah kode.

### 1. Melihat Ringkasan Absensi

Pada bagian atas halaman **Data Absensi**, tersedia empat kartu statistik:

| Statistik | Arti |
|---|---|
| Masuk Hari Ini | Jumlah absensi yang memiliki tanggal sama dengan hari ini |
| On Time | Jumlah karyawan yang masuk maksimal pukul `08:00 WIB` |
| Terlambat | Jumlah karyawan yang masuk setelah pukul `08:00 WIB` |
| Jam Masuk Default | Batas waktu masuk yang digunakan aplikasi, yaitu `08:00 WIB` |

Statistik dihitung dari seluruh data yang tersimpan dan tidak berubah ketika
search, filter, atau pagination digunakan.

### 2. Menambahkan Data Absensi

1. Klik menu **Tambah Absensi** pada sidebar atau tombol **Tambah Absensi**.
2. Isi seluruh field pada form.
3. Klik **Tambah Data**.
4. Data akan langsung disimpan pada browser.

### 3. Mengedit Data

1. Buka halaman **Data Absensi**.
2. Klik tombol edit pada kolom **Aksi**.
3. Perbarui data yang diperlukan.
4. Klik **Simpan Perubahan**.

### 4. Menghapus Data

1. Klik tombol hapus pada kolom **Aksi**.
2. Periksa kembali nama karyawan pada modal konfirmasi.
3. Klik **Ya, Hapus**.

Data yang sudah dihapus tidak dapat dikembalikan.

### 5. Mencari, Memfilter, dan Mengurutkan Data

- Gunakan kolom pencarian untuk mencari nama, alamat, jenis kelamin, atau
  tanggal.
- Klik tombol **Filter** untuk memilih jenis kelamin atau tanggal absen.
- Klik **Reset** pada panel Filter untuk menghapus semua filter.
- Panel Filter dapat ditutup dengan klik di luar panel atau menekan `Escape`.
- Gunakan dropdown **Sort by** untuk memilih urutan data.
- Klik judul kolom yang memiliki ikon sort untuk mengubah urutan langsung dari
  tabel.

### 6. Penyimpanan Data

Data disimpan hanya pada browser dan perangkat yang sedang digunakan.

> Menghapus data situs, cache tertentu, atau `localStorage` browser akan
> menghapus seluruh data absensi aplikasi.

## Perhitungan Statistik

Aplikasi menggunakan aturan berikut:

```text
Jam masuk default : 08:00 WIB
On Time           : jam_masuk <= 08:00
Terlambat         : jam_masuk > 08:00
Masuk Hari Ini    : tanggal_absen sama dengan tanggal lokal browser
```

Tanggal hari ini mengikuti timezone perangkat pengguna.

## Field dan Validasi

| Field | Tipe | Validasi |
|---|---|---|
| Nama | Text | Wajib diisi, minimal 3 karakter |
| Alamat | Textarea | Wajib diisi |
| Jenis Kelamin | Select | Wajib memilih Laki-laki atau Perempuan |
| Tanggal Absen | Date | Wajib diisi |
| Jam Masuk | Time | Wajib diisi |
| Jam Keluar | Time | Wajib diisi dan harus setelah jam masuk |

## Panduan Developer

### Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router DOM v6 |
| State Management | React Hooks |
| Admin Template | Backstrap 0.5.1 |
| CSS Framework | Bootstrap 4 dan CoreUI v2 melalui Backstrap |
| Storage | Browser `localStorage` |
| Language | JavaScript ES6+ |

### Penggunaan Backstrap

Project menggunakan **Backstrap 0.5.1** sebagai fondasi admin template.
Backstrap berbasis Bootstrap 4 dan CoreUI v2.

- Stylesheet tersedia di `public/backstrap.min.css`.
- Stylesheet dimuat melalui `index.html`.
- Struktur layout Backstrap menggunakan class seperti `app-header`, `app-body`,
  `sidebar`, `main`, `card`, `table`, `form-control`, dan `pagination`.
- Penyesuaian tampilan dan responsivitas berada di `src/index.css`.

Jangan menghapus `public/backstrap.min.css` karena layout dan komponen Bootstrap
bergantung pada file tersebut.

## Arsitektur dan Alur Data

```text
AttendanceList / AttendanceForm
             |
             v
       useAttendance hook
             |
             v
        storage utility
             |
             v
     browser localStorage
```

### Tanggung Jawab File Utama

| File | Tanggung Jawab |
|---|---|
| `src/App.jsx` | Mendefinisikan route aplikasi |
| `src/components/layout/AdminLayout.jsx` | Menyatukan sidebar, navbar, konten, dan footer |
| `src/pages/AttendanceList.jsx` | UI statistik, list, search, filter, sort, pagination, dan delete |
| `src/pages/AttendanceForm.jsx` | UI create dan edit absensi |
| `src/hooks/useAttendance.js` | CRUD state, statistik, filter, sorting, dan pagination |
| `src/utils/storage.js` | Membaca dan menulis data `localStorage` |
| `src/utils/helpers.js` | Validasi, format tanggal/waktu, ID, dan sorting |
| `src/index.css` | Custom styling dan responsive layout |

### Pipeline Data List

```text
records
  -> search dan filter
  -> sorting
  -> pagination
  -> render tabel
```

Statistik menggunakan `records` asli agar tidak terpengaruh search, filter,
sorting, atau pagination.

## Halaman dan Route

| Route | Halaman | Deskripsi |
|---|---|---|
| `/` | Redirect | Mengarahkan pengguna ke `/attendance` |
| `/attendance` | Attendance List | Statistik, list, search, filter, sort, pagination, edit, dan delete |
| `/attendance/create` | Attendance Form | Form tambah data absensi |
| `/attendance/edit/:id` | Attendance Form | Form edit data absensi |

## Struktur Project

```text
attendance-employee/
|-- public/
|   |-- backstrap.min.css
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- components/
|   |   |-- layout/
|   |   |   |-- AdminLayout.jsx
|   |   |   |-- Navbar.jsx
|   |   |   `-- Sidebar.jsx
|   |   `-- ui/
|   |       |-- ConfirmModal.jsx
|   |       |-- Pagination.jsx
|   |       `-- SortButton.jsx
|   |-- hooks/
|   |   `-- useAttendance.js
|   |-- pages/
|   |   |-- AttendanceForm.jsx
|   |   `-- AttendanceList.jsx
|   |-- utils/
|   |   |-- helpers.js
|   |   `-- storage.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
`-- vite.config.js
```

## Data Model

```js
{
  id: "att_1717660000000_xxxxxxx",
  nama: "Budi Santoso",
  alamat: "Jl. Merdeka No. 10, Jakarta",
  jenis_kelamin: "Laki-laki",
  tanggal_absen: "2026-06-06",
  jam_masuk: "08:00",
  jam_keluar: "17:00",
  created_at: 1717660000000,
  updated_at: 1717660000000
}
```

Data disimpan menggunakan key:

```text
attendance_records
```

Jika key belum memiliki data, `storage.seed()` akan membuat data contoh.

## Menjalankan Project

### Prasyarat

- Node.js
- npm
- Browser modern

### Instalasi

```bash
git clone https://github.com/Ranggadya/Attendance-Employee.git
cd Attendance-Employee
npm install
```

### Development Server

```bash
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

### Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat production build pada folder `dist/` |
| `npm run preview` | Menjalankan preview dari production build |

## Mengembangkan Fitur

### Mengubah Jam Masuk Default

Ubah konstanta berikut pada `src/hooks/useAttendance.js`:

```js
const DEFAULT_CHECK_IN = '08:00'
```

### Menambahkan Field Absensi

1. Tambahkan field pada `EMPTY_FORM` di `AttendanceForm.jsx`.
2. Tambahkan input pada form.
3. Tambahkan validasi pada `validateForm()` di `helpers.js`.
4. Tambahkan kolom tabel jika field perlu ditampilkan.
5. Perbarui data contoh pada `storage.js` bila diperlukan.

### Menambahkan Opsi Sorting

1. Tambahkan pilihan pada dropdown **Sort by** di `AttendanceList.jsx`.
2. Gunakan format value `nama_field:direction`.
3. Pastikan field tersedia pada data model.

Contoh:

```jsx
<option value="nama:asc">Nama A-Z</option>
```

### Mengganti localStorage dengan API

Pertahankan interface fungsi pada `src/utils/storage.js` atau pindahkan operasi
asynchronous ke service baru. Fungsi yang perlu digantikan:

```text
getAll
getById
save
update
remove
```

Hook `useAttendance` juga perlu disesuaikan menjadi asynchronous saat memakai
API.

## Production Build dan Deployment

Jalankan:

```bash
npm run build
```

Folder `dist/` dapat di-deploy ke static hosting seperti:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Karena aplikasi menggunakan `BrowserRouter`, hosting perlu diarahkan untuk
melayani `index.html` pada route yang tidak ditemukan. Untuk GitHub Pages,
pertimbangkan menggunakan konfigurasi SPA fallback atau mengganti routing
menjadi `HashRouter`.

## Troubleshooting

### Data contoh tidak muncul

Pastikan browser mengizinkan `localStorage`. Data contoh hanya dibuat ketika
key `attendance_records` kosong.

### Ingin mengembalikan data contoh

Hapus key berikut melalui browser DevTools, lalu refresh halaman:

```text
attendance_records
```

### Data tidak sama pada browser lain

Hal tersebut normal karena data disimpan secara lokal pada setiap browser dan
perangkat.

### Styling Backstrap tidak muncul

Pastikan file berikut tersedia:

```text
public/backstrap.min.css
```

Pastikan `index.html` masih memuat:

```html
<link rel="stylesheet" href="/backstrap.min.css" />
```

### Route error setelah deployment

Konfigurasikan SPA fallback pada hosting agar semua route mengarah ke
`index.html`.

## Batasan Saat Ini

- Belum menggunakan backend atau database server
- Data tidak tersinkron antar browser atau perangkat
- Belum tersedia autentikasi admin
- Belum tersedia automated test
- Belum tersedia export atau import data

## Author

[Ranggadya](https://github.com/Ranggadya)
