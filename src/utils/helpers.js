/* ---------- ID ---------- */
export const generateId = () =>
  'att_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)

/* ---------- Formatting ---------- */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export const formatTime = (timeStr) => timeStr || '-'

/* ---------- Form Validation ---------- */
export const validateForm = (data) => {
  const errors = {}

  if (!data.nama?.trim()) {
    errors.nama = 'Nama harus diisi'
  } else if (data.nama.trim().length < 3) {
    errors.nama = 'Nama minimal 3 karakter'
  }

  if (!data.alamat?.trim()) {
    errors.alamat = 'Alamat harus diisi'
  }

  if (!data.jenis_kelamin) {
    errors.jenis_kelamin = 'Jenis kelamin harus dipilih'
  }

  if (!data.tanggal_absen) {
    errors.tanggal_absen = 'Tanggal absen harus diisi'
  }

  if (!data.jam_masuk) {
    errors.jam_masuk = 'Jam masuk harus diisi'
  }

  if (!data.jam_keluar) {
    errors.jam_keluar = 'Jam keluar harus diisi'
  } else if (data.jam_masuk && data.jam_keluar <= data.jam_masuk) {
    errors.jam_keluar = 'Jam keluar harus setelah jam masuk'
  }

  return errors
}

export const isValid = (errors) => Object.keys(errors).length === 0

/* ---------- Sorting ---------- */
export const sortData = (data, { key, direction }) => {
  if (!key) return data
  return [...data].sort((a, b) => {
    const av = (a[key] ?? '').toString().toLowerCase()
    const bv = (b[key] ?? '').toString().toLowerCase()
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return direction === 'asc' ? cmp : -cmp
  })
}
