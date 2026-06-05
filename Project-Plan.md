# Employee Attendance Admin Panel

Employee Attendance Admin Panel adalah aplikasi frontend berbasis React untuk mengelola data absensi karyawan melalui halaman admin sederhana. Project ini dibuat sebagai technical test Frontend Web Developer Intern.

## Template Usage

Project ini menggunakan **Backstrap Admin Template** sebagai dasar layout dan tampilan admin panel. Struktur HTML Backstrap seperti sidebar, navbar, card, table, form, button, dan pagination class diadaptasi ke dalam komponen React menggunakan class name yang sama dari Bootstrap 4.

Backstrap diintegrasikan melalui package `@digitallyhappy/backstrap` yang di-import langsung ke dalam entry point React, sehingga seluruh CSS Bootstrap 4 dan CoreUI tersedia secara global di semua komponen.

React digunakan untuk mengelola component rendering, routing, CRUD logic, form handling, sorting, pagination, dan localStorage data management.

## Features

- Menampilkan daftar data absensi karyawan
- Menambahkan data absensi karyawan baru
- Mengedit data absensi karyawan yang sudah ada
- Menghapus data absensi karyawan
- Sorting data berdasarkan nama, tanggal absen, dan jam masuk
- Pagination data absensi
- Validasi form input (client-side)
- Penyimpanan data menggunakan localStorage
- Admin layout menggunakan Backstrap Admin Template (sidebar, navbar, card)

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React.js 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| State Management | React Hooks (useState, useEffect, useContext) |
| Admin Template | Backstrap Admin Template (`@digitallyhappy/backstrap`) |
| CSS Framework | Bootstrap 4 (via Backstrap) |
| Custom Styling | CSS (minor overrides only) |
| Storage | localStorage (browser-side) |
| Language | JavaScript (ES6+) |

## Form Fields

| Field | Type | Validasi |
|---|---|---|
| Nama | Text | Required, min 3 karakter |
| Alamat | Textarea | Required |
| Jenis Kelamin | Select | Required (Laki-laki / Perempuan) |
| Tanggal Absen | Date | Required, tidak boleh future date |
| Jam Masuk | Time | Required |
| Jam Keluar | Time | Required, harus setelah jam masuk |

## Pages & Routes

| Route | Page | Deskripsi |
|---|---|---|
| `/` | Redirect | Redirect ke `/attendance` |
| `/attendance` | AttendanceList | List data + CRUD actions + sort + pagination |
| `/attendance/create` | AttendanceForm | Form tambah data baru |
| `/attendance/edit/:id` | AttendanceForm | Form edit data (reuse komponen yang sama) |

## Project Structure

```
attendance-admin/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx     ← Backstrap sidebar + navbar wrapper
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navbar.jsx
│   │   └── ui/
│   │       ├── Pagination.jsx
│   │       ├── SortButton.jsx
│   │       └── ConfirmModal.jsx
│   ├── pages/
│   │   ├── AttendanceList.jsx      ← halaman list + sort + pagination
│   │   └── AttendanceForm.jsx      ← halaman create & edit (mode via route param)
│   ├── hooks/
│   │   └── useAttendance.js        ← custom hook CRUD + sort + pagination logic
│   ├── utils/
│   │   ├── storage.js              ← abstraksi localStorage
│   │   └── helpers.js              ← format tanggal, generate ID
│   ├── App.jsx
│   ├── main.jsx                    ← import Backstrap CSS di sini
│   └── index.css                   ← minor overrides saja
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Data Model

```js
// Struktur satu record absensi di localStorage
{
  id: "uuid-xxxx",
  nama: "Budi Santoso",
  alamat: "Jl. Merdeka No. 10, Jakarta",
  jenis_kelamin: "Laki-laki",   // "Laki-laki" | "Perempuan"
  tanggal_absen: "2026-06-06",  // format YYYY-MM-DD
  jam_masuk: "08:00",           // format HH:mm
  jam_keluar: "17:00",          // format HH:mm
  created_at: 1717660000000,    // Unix timestamp
  updated_at: 1717660000000
}
```

## Getting Started

```bash
# Clone repository
git clone https://github.com/username/attendance-admin.git
cd attendance-admin

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Info

| | |
|---|---|
| Project Name | Employee Attendance Admin Panel |
| Framework | React.js 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| Template | Backstrap Admin Template |
| Styling | Backstrap + Bootstrap 4 + custom CSS minor |
| Storage | localStorage |
| Main Pages | Attendance List, Create Attendance, Edit Attendance |
| Main Features | CRUD, Sort By, Pagination, Form Validation |
| Submission | GitHub/GitLab Repository Link |