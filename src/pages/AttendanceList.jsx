import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAttendance } from '../hooks/useAttendance'
import { formatDate, formatTime } from '../utils/helpers'
import SortButton from '../components/ui/SortButton'
import Pagination from '../components/ui/Pagination'
import ConfirmModal from '../components/ui/ConfirmModal'

export default function AttendanceList() {
  const navigate = useNavigate()
  const {
    records, totalItems, totalRecords, startIndex, endIndex,
    statistics,
    sortConfig, handleSort, setSortKey, setSortDirection,
    search, setSearch,
    genderFilter, setGenderFilter,
    dateFilter, setDateFilter, clearFilters,
    currentPage, totalPages, setCurrentPage,
    remove,
  } = useAttendance()

  const [deleteTarget, setDeleteTarget] = useState(null) // { id, nama }
  const [toast, setToast] = useState(null)               // { type, message }
  const [filterOpen, setFilterOpen] = useState(false)
  const filterMenuRef = useRef(null)
  const hasFilters = Boolean(genderFilter || dateFilter)
  const hasQuery = Boolean(search || hasFilters)

  useEffect(() => {
    if (!filterOpen) return

    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setFilterOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') setFilterOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [filterOpen])

  /* ------ Handlers ------ */
  const handleDeleteClick = (record) => {
    setDeleteTarget(record)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    remove(deleteTarget.id)
    setDeleteTarget(null)
    showToast('success', `Data absensi "${deleteTarget.nama}" berhasil dihapus.`)
  }

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSortOption = (value) => {
    const [key, direction] = value.split(':')
    setSortKey(key)
    setSortDirection(direction)
  }

  /* ------ Render ------ */
  return (
    <div className="fade-in">

      {/* Toast notification */}
      {toast && (
        <div
          className={`alert alert-${toast.type} alert-dismissible`}
          style={{ marginBottom: 16 }}
        >
          {toast.message}
          <button
            type="button"
            className="close"
            onClick={() => setToast(null)}
          >
            <span>&times;</span>
          </button>
        </div>
      )}

      <section className="attendance-statistics" aria-label="Statistik absensi hari ini">
        <article className="stat-card stat-present">
          <header className="stat-card-header">
            <span>Masuk Hari Ini</span>
            <small>{statistics.todayLabel}</small>
          </header>
          <div className="stat-card-body">
            <strong>{statistics.presentToday}</strong>
            <span className="stat-card-footer">
              <small>Karyawan</small>
              <small>Hari ini</small>
            </span>
          </div>
        </article>

        <article className="stat-card stat-ontime">
          <header className="stat-card-header">On Time</header>
          <div className="stat-card-body">
            <strong>{statistics.onTimeToday}</strong>
            <span className="stat-card-footer">
              <small>Karyawan</small>
              <small>&le; 08:00 WIB</small>
            </span>
          </div>
        </article>

        <article className="stat-card stat-late">
          <header className="stat-card-header">Terlambat</header>
          <div className="stat-card-body">
            <strong>{statistics.lateToday}</strong>
            <span className="stat-card-footer">
              <small>Karyawan</small>
              <small>&gt; 08:00 WIB</small>
            </span>
          </div>
        </article>

        <article className="stat-card stat-schedule">
          <header className="stat-card-header">Jam Masuk Default</header>
          <div className="stat-card-body">
            <strong>{statistics.defaultCheckIn} WIB</strong>
            <span className="stat-card-footer">
              <small>Jadwal</small>
              <small>Setiap hari kerja</small>
            </span>
          </div>
        </article>
      </section>

      {/* Page header card */}
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap" style={{ gap: 8 }}>
          <div>
            <h4 className="mb-0" style={{ fontWeight: 600 }}>Data Absensi Karyawan</h4>
            <small className="text-muted">Total {totalRecords} data tersimpan</small>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/attendance/create')}
          >
            + Tambah Absensi
          </button>
        </div>

        <div className="card-body">
          {/* Search and sort controls */}
          <div className="attendance-toolbar mb-3">
            <div className="attendance-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari nama, alamat, tanggal..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setSearch('')}
                      title="Hapus pencarian"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="attendance-filter-menu" ref={filterMenuRef}>
              <button
                type="button"
                className={`attendance-filter-button${hasFilters ? ' active' : ''}`}
                onClick={() => setFilterOpen((open) => !open)}
                aria-expanded={filterOpen}
              >
                <span aria-hidden="true">&#9661;</span>
                Filter
                {hasFilters && <span className="filter-count">!</span>}
                <span aria-hidden="true">&#8964;</span>
              </button>

              {filterOpen && (
                <div className="attendance-filter-popover">
                  <div className="filter-popover-header">
                    <strong>Filter Data</strong>
                    {hasFilters && (
                      <button type="button" onClick={clearFilters}>Reset</button>
                    )}
                  </div>

                  <label>
                    <span>Jenis kelamin</span>
                    <select
                      className="form-control"
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                    >
                      <option value="">Semua</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </label>

                  <label>
                    <span>Tanggal absen</span>
                    <input
                      type="date"
                      className="form-control"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>

            <label className="attendance-sort-field">
              <span>Sort by:</span>
              <select
                className="form-control attendance-sort-control"
                value={`${sortConfig.key}:${sortConfig.direction}`}
                onChange={(e) => handleSortOption(e.target.value)}
              >
                <option value="nama:asc">Nama A-Z</option>
                <option value="nama:desc">Nama Z-A</option>
                <option value="tanggal_absen:desc">Tanggal Terbaru</option>
                <option value="tanggal_absen:asc">Tanggal Terlama</option>
                <option value="jam_masuk:asc">Jam Masuk Paling Awal</option>
                <option value="jam_masuk:desc">Jam Masuk Paling Akhir</option>
                <option value="jam_keluar:asc">Jam Keluar Paling Awal</option>
                <option value="jam_keluar:desc">Jam Keluar Paling Akhir</option>
              </select>
            </label>

            {hasQuery && (
              <div className="attendance-result-count">
                <small className="text-muted">
                  Menampilkan {totalItems} dari {totalRecords} data
                </small>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>
                    <SortButton
                      label="Nama"
                      sortKey="nama"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  </th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>
                    <SortButton
                      label="Tanggal Absen"
                      sortKey="tanggal_absen"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  </th>
                  <th>
                    <SortButton
                      label="Jam Masuk"
                      sortKey="jam_masuk"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  </th>
                  <th>Jam Keluar</th>
                  <th style={{ width: 120 }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">
                        <div>&#128203;</div>
                        <div style={{ marginTop: 8, fontWeight: 500 }}>
                          {hasQuery ? 'Data tidak ditemukan' : 'Belum ada data absensi'}
                        </div>
                        {!hasQuery && (
                          <div style={{ marginTop: 8 }}>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => navigate('/attendance/create')}
                            >
                              Tambah Absensi Pertama
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((record, idx) => (
                    <tr key={record.id}>
                      <td className="text-center text-muted" style={{ fontSize: 12 }}>
                        {startIndex + idx}
                      </td>
                      <td style={{ fontWeight: 500 }}>{record.nama}</td>
                      <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span title={record.alamat}>{record.alamat}</span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-pill ${
                            record.jenis_kelamin === 'Laki-laki'
                              ? 'badge-gender-l'
                              : 'badge-gender-p'
                          }`}
                        >
                          {record.jenis_kelamin}
                        </span>
                      </td>
                      <td>{formatDate(record.tanggal_absen)}</td>
                      <td>{formatTime(record.jam_masuk)}</td>
                      <td>{formatTime(record.jam_keluar)}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/attendance/edit/${record.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(record)}
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer: info + pagination */}
          {records.length > 0 && (
            <div className="d-flex align-items-center justify-content-between flex-wrap mt-3" style={{ gap: 12 }}>
              <small className="text-muted">
                Menampilkan {startIndex}–{endIndex} dari {totalItems} data
              </small>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Konfirmasi Hapus"
        message={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus data absensi "${deleteTarget.nama}"? Tindakan ini tidak dapat dibatalkan.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
