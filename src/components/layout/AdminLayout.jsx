import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`app sidebar-lg-show${sidebarOpen ? ' sidebar-show' : ''}`}>
      <div className="app-layout">
        <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <div className="app-body">
          <Sidebar
            onClose={() => setSidebarOpen(false)}
          />

          <main
            className="main"
            onClick={sidebarOpen ? () => setSidebarOpen(false) : undefined}
          >
            <div className="container-fluid">
              <Outlet />
            </div>
          </main>
        </div>

        <footer className="app-footer">
          <div className="footer-brand">
            <span className="footer-status" aria-hidden="true" />
            <span>
              <strong>Employee Attendance</strong>
              <small>Admin Panel</small>
            </span>
          </div>
          <div className="footer-meta">
            <span>&copy; 2026</span>
            <span className="footer-separator">|</span>
            <span>Built with React + </span>
            <a
              href="https://backstrap.net"
              target="_blank"
              rel="noreferrer"
            >
              Backstrap
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
