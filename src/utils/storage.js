// Abstraksi localStorage yang menangani penyimpanan dan CRUD data absensi.
const STORAGE_KEY = 'attendance_records'

// Pembacaan dibuat aman agar aplikasi tetap berjalan saat data tersimpan rusak.
const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const write = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getAll = () => read()

export const getById = (id) => read().find((r) => r.id === id) ?? null

export const save = (record) => {
  const all = read()
  all.unshift(record)
  write(all)
  return record
}

export const update = (id, changes) => {
  const all = read()
  const idx = all.findIndex((r) => r.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], ...changes, updated_at: Date.now() }
  write(all)
  return all[idx]
}

export const remove = (id) => {
  write(read().filter((r) => r.id !== id))
}

// Mengisi data contoh satu kali saat localStorage belum memiliki record.
export const seed = () => {
  if (read().length > 0) return

  const records = [
    {
      id: 'att_seed_001',
      nama: 'Budi Santoso',
      alamat: 'Jl. Merdeka No. 10, Jakarta Pusat',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-02',
      jam_masuk: '08:00',
      jam_keluar: '17:00',
      created_at: Date.now() - 5 * 86400000,
      updated_at: Date.now() - 5 * 86400000,
    },
    {
      id: 'att_seed_002',
      nama: 'Siti Rahayu',
      alamat: 'Jl. Sudirman Kav. 52, Jakarta Selatan',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-02',
      jam_masuk: '08:15',
      jam_keluar: '17:30',
      created_at: Date.now() - 4 * 86400000,
      updated_at: Date.now() - 4 * 86400000,
    },
    {
      id: 'att_seed_003',
      nama: 'Ahmad Fauzi',
      alamat: 'Jl. Gatot Subroto No. 7, Bandung',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-03',
      jam_masuk: '07:45',
      jam_keluar: '16:45',
      created_at: Date.now() - 3 * 86400000,
      updated_at: Date.now() - 3 * 86400000,
    },
    {
      id: 'att_seed_004',
      nama: 'Dewi Lestari',
      alamat: 'Jl. Pahlawan No. 3, Surabaya',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-03',
      jam_masuk: '08:30',
      jam_keluar: '17:00',
      created_at: Date.now() - 3 * 86400000,
      updated_at: Date.now() - 3 * 86400000,
    },
    {
      id: 'att_seed_005',
      nama: 'Rizky Pratama',
      alamat: 'Jl. Diponegoro No. 21, Yogyakarta',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-04',
      jam_masuk: '08:00',
      jam_keluar: '17:15',
      created_at: Date.now() - 2 * 86400000,
      updated_at: Date.now() - 2 * 86400000,
    },
    {
      id: 'att_seed_006',
      nama: 'Nur Halimah',
      alamat: 'Jl. Imam Bonjol No. 5, Semarang',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-04',
      jam_masuk: '08:10',
      jam_keluar: '17:10',
      created_at: Date.now() - 2 * 86400000,
      updated_at: Date.now() - 2 * 86400000,
    },
    {
      id: 'att_seed_007',
      nama: 'Hendra Wijaya',
      alamat: 'Jl. Ahmad Yani No. 88, Medan',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-05',
      jam_masuk: '07:50',
      jam_keluar: '16:50',
      created_at: Date.now() - 1 * 86400000,
      updated_at: Date.now() - 1 * 86400000,
    },
    {
      id: 'att_seed_008',
      nama: 'Fitriani Putri',
      alamat: 'Jl. Veteran No. 12, Makassar',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-05',
      jam_masuk: '08:05',
      jam_keluar: '17:05',
      created_at: Date.now() - 1 * 86400000,
      updated_at: Date.now() - 1 * 86400000,
    },
    {
      id: 'att_seed_009',
      nama: 'Dani Kurniawan',
      alamat: 'Jl. Raya Darmo No. 45, Surabaya',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-06',
      jam_masuk: '08:00',
      jam_keluar: '17:00',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 'att_seed_010',
      nama: 'Ayu Wandira',
      alamat: 'Jl. Cendana No. 8, Denpasar',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-06',
      jam_masuk: '08:20',
      jam_keluar: '17:20',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 'att_seed_011',
      nama: 'Eko Prasetyo',
      alamat: 'Jl. Mawar No. 15, Malang',
      jenis_kelamin: 'Laki-laki',
      tanggal_absen: '2026-06-06',
      jam_masuk: '08:00',
      jam_keluar: '17:00',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 'att_seed_012',
      nama: 'Linda Puspita',
      alamat: 'Jl. Melati No. 22, Bogor',
      jenis_kelamin: 'Perempuan',
      tanggal_absen: '2026-06-06',
      jam_masuk: '08:30',
      jam_keluar: '17:30',
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  ]

  write(records)
}
