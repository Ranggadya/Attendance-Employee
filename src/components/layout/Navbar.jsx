import { useLocation } from 'react-router-dom'

const PAGE_INFO = {
  '/attendance': {
    eyebrow: 'Manajemen Absensi',
    title: 'Data Absensi Karyawan',
  },
  '/attendance/create': {
    eyebrow: 'Form Absensi',
    title: 'Tambah Data Absensi',
  },
}

function getPageInfo(pathname) {
  if (pathname.includes('/attendance/edit/')) {
    return {
      eyebrow: 'Form Absensi',
      title: 'Edit Data Absensi',
    }
  }

  return PAGE_INFO[pathname] ?? {
    eyebrow: 'Administration',
    title: 'Admin Panel',
  }
}

export default function Navbar({ onToggleSidebar }) {
  const { pathname } = useLocation()
  const pageInfo = getPageInfo(pathname)

  return (
    <header className="app-header navbar topbar">
      <button
        className="navbar-toggler sidebar-toggler d-lg-none topbar-menu-button"
        type="button"
        onClick={onToggleSidebar}
        aria-label="Buka menu navigasi"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="topbar-page">
        <span className="topbar-eyebrow">{pageInfo.eyebrow}</span>
        <strong className="topbar-title">{pageInfo.title}</strong>
      </div>

      <div className="topbar-actions">
        <div className="admin-profile" title="Administrator" aria-label="Profil administrator">
          <span className="admin-avatar">A</span>
        </div>
      </div>
    </header>
  )
}
