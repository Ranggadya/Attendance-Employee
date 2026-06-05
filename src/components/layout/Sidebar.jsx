import { NavLink } from 'react-router-dom'

export default function Sidebar({ show, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {show && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1029,
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={onClose}
        />
      )}

      <div className={`c-sidebar c-sidebar-dark c-sidebar-fixed${show ? ' c-sidebar-show' : ''}`}>
        {/* Brand */}
        <div className="c-sidebar-brand">
          <span className="c-sidebar-brand-full" style={{ fontWeight: 700, fontSize: 18 }}>
            &#128197; Attendance
          </span>
          <span className="c-sidebar-brand-minimized" style={{ fontWeight: 700 }}>
            AT
          </span>
        </div>

        {/* Navigation */}
        <ul className="c-sidebar-nav">
          <li className="c-sidebar-nav-title">Menu</li>

          <li className="c-sidebar-nav-item">
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `c-sidebar-nav-link${isActive ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <svg
                className="c-sidebar-nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Data Absensi
            </NavLink>
          </li>

          <li className="c-sidebar-nav-item">
            <NavLink
              to="/attendance/create"
              className={({ isActive }) =>
                `c-sidebar-nav-link${isActive ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <svg
                className="c-sidebar-nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tambah Absensi
            </NavLink>
          </li>
        </ul>

        {/* Footer info */}
        <div className="c-sidebar-footer">
          <div style={{ padding: '12px 16px', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            Backstrap + React v18
          </div>
        </div>
      </div>
    </>
  )
}
