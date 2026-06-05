import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="c-app c-default-layout">
      <Sidebar
        show={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="c-wrapper">
        <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <div className="c-body">
          <main className="c-main">
            <div className="container-fluid">
              <Outlet />
            </div>
          </main>
        </div>

        <footer className="c-footer">
          <div>
            <span>Employee Attendance Admin Panel &copy; 2026</span>
          </div>
          <div className="ml-auto">
            Powered by{' '}
            <a
              href="https://backstrap.net"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#467FD0' }}
            >
              Backstrap
            </a>
            {' '}+ React
          </div>
        </footer>
      </div>
    </div>
  )
}
