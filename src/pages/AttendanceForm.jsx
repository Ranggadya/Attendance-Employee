// Halaman form reusable untuk menambahkan dan mengedit data absensi.
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAttendance } from '../hooks/useAttendance'
import { validateForm, isValid } from '../utils/helpers'

const EMPTY_FORM = {
  nama: '',
  alamat: '',
  jenis_kelamin: '',
  tanggal_absen: '',
  jam_masuk: '',
  jam_keluar: '',
}

export default function AttendanceForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const { create, update, getById } = useAttendance()

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // Pada mode edit, isi form diambil dari record sesuai ID pada URL.
  useEffect(() => {
    if (!isEdit) return

    const record = getById(id)
    if (!record) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setFormData({
      nama: record.nama,
      alamat: record.alamat,
      jenis_kelamin: record.jenis_kelamin,
      tanggal_absen: record.tanggal_absen,
      jam_masuk: record.jam_masuk,
      jam_keluar: record.jam_keluar,
    })
    setLoading(false)
  }, [id, isEdit, getById])

  // Memperbarui nilai input sekaligus membersihkan error field yang sedang diedit.
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  // Validasi form sebelum membuat record baru atau menyimpan perubahan.
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (!isValid(validationErrors)) {
      setErrors(validationErrors)
      const firstErrorEl = document.querySelector('.is-invalid')
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    if (isEdit) {
      update(id, formData)
    } else {
      create(formData)
    }

    setSubmitting(false)
    navigate('/attendance', {
      state: {
        toast: {
          type: 'success',
          message: isEdit
            ? `Data absensi "${formData.nama}" berhasil diperbarui.`
            : `Data absensi "${formData.nama}" berhasil ditambahkan.`,
        },
      },
    })
  }

  // Menyatukan properti yang digunakan berulang oleh setiap input form.
  const field = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    className: `form-control${errors[name] ? ' is-invalid' : ''}`,
  })

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
        <div className="text-muted">Memuat data...</div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="empty-state">
            <div>&#10067;</div>
            <div style={{ marginTop: 8, fontWeight: 500 }}>Data tidak ditemukan</div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/attendance')}>
                Kembali ke List
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-lg-8 col-xl-7">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0" style={{ fontWeight: 600 }}>
              {isEdit ? 'Edit Data Absensi' : 'Tambah Data Absensi'}
            </h4>
            <small className="text-muted">
              {isEdit
                ? 'Perbarui informasi absensi karyawan di bawah ini'
                : 'Isi formulir berikut untuk menambahkan data absensi karyawan'}
            </small>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>

              <div className="form-group">
                <label htmlFor="nama">
                  Nama Karyawan <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  {...field('nama')}
                  placeholder="Masukkan nama lengkap karyawan"
                  autoComplete="off"
                />
                {errors.nama && (
                  <div className="invalid-feedback">{errors.nama}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="alamat">
                  Alamat <span className="text-danger">*</span>
                </label>
                <textarea
                  {...field('alamat')}
                  rows={3}
                  placeholder="Masukkan alamat lengkap karyawan"
                />
                {errors.alamat && (
                  <div className="invalid-feedback">{errors.alamat}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="jenis_kelamin">
                  Jenis Kelamin <span className="text-danger">*</span>
                </label>
                <select {...field('jenis_kelamin')}>
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenis_kelamin && (
                  <div className="invalid-feedback">{errors.jenis_kelamin}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tanggal_absen">
                  Tanggal Absen <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  {...field('tanggal_absen')}
                />
                {errors.tanggal_absen && (
                  <div className="invalid-feedback">{errors.tanggal_absen}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="jam_masuk">
                    Jam Masuk <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    {...field('jam_masuk')}
                  />
                  {errors.jam_masuk && (
                    <div className="invalid-feedback">{errors.jam_masuk}</div>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="jam_keluar">
                    Jam Keluar <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    {...field('jam_keluar')}
                  />
                  {errors.jam_keluar && (
                    <div className="invalid-feedback">{errors.jam_keluar}</div>
                  )}
                </div>
              </div>

              <div className="d-flex" style={{ gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Menyimpan...'
                    : isEdit
                    ? 'Simpan Perubahan'
                    : 'Tambah Data'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/attendance')}
                  disabled={submitting}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-muted mt-2 mb-4" style={{ fontSize: 12 }}>
          <span className="text-danger">*</span> Semua field wajib diisi
        </div>
      </div>
    </div>
  )
}
