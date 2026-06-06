// Sidebar menyediakan navigasi utama untuk halaman list dan form absensi.
import { NavLink, useLocation } from 'react-router-dom'

const ICON_SIZE = { width: 20, height: 20 }

function IconUsers() {
  return (
    <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="nav-icon" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="nav-icon" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg {...ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 15h3M14 15h2" />
    </svg>
  )
}

export default function Sidebar({ onClose }) {
  const { pathname } = useLocation()
  const isEditPage = pathname.includes('/attendance/edit/')

  return (
    <aside className="sidebar sidebar-pills attendance-sidebar" aria-label="Navigasi utama">
      <div className="sidebar-brand-panel">
        <div className="sidebar-brand-icon">
          <IconCalendar />
        </div>
        <div className="sidebar-brand-copy">
          <strong>Attendance</strong>
          <span>Admin Panel</span>
        </div>
        <button
          className="sidebar-close-button d-lg-none"
          type="button"
          onClick={onClose}
          aria-label="Tutup menu navigasi"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav">

          <li className="nav-item">
            <NavLink
              to="/attendance"
              end
              className={({ isActive }) =>
                `nav-link${isActive || isEditPage ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <IconUsers />
              <span className="sidebar-link-copy">
                <strong>Data Absensi</strong>
                <small>Kelola data karyawan</small>
              </span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/attendance/create"
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <IconPlus />
              <span className="sidebar-link-copy">
                <strong>Tambah Absensi</strong>
                <small>Input data baru</small>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
