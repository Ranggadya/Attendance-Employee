import { useLocation } from 'react-router-dom'

const TITLES = {
  '/attendance': 'Data Absensi Karyawan',
  '/attendance/create': 'Tambah Data Absensi',
}

function getTitle(pathname) {
  if (pathname.includes('/attendance/edit/')) return 'Edit Data Absensi'
  return TITLES[pathname] ?? 'Admin Panel'
}

export default function Navbar({ onToggleSidebar }) {
  const { pathname } = useLocation()
  const title = getTitle(pathname)

  return (
    <header className="c-header c-header-light border-bottom">
      {/* Hamburger toggle */}
      <button
        className="c-header-toggler c-class-toggler d-lg-none mr-auto"
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        style={{
          background: 'none', border: 'none', padding: '0 16px',
          fontSize: 20, cursor: 'pointer', color: '#768192',
        }}
      >
        &#9776;
      </button>

      {/* Page title */}
      <div className="c-header-nav ml-3" style={{ flex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: '#3c4b64' }}>
          {title}
        </span>
      </div>

      {/* Right side */}
      <ul className="c-header-nav ml-auto mr-3">
        <li className="c-header-nav-item">
          <span
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, color: '#768192',
            }}
          >
            <span
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#467FD0', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}
            >
              A
            </span>
            Admin
          </span>
        </li>
      </ul>
    </header>
  )
}
