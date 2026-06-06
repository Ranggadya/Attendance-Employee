// Konfigurasi route utama dan hubungan setiap halaman dengan layout admin.
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import AttendanceList from './pages/AttendanceList'
import AttendanceForm from './pages/AttendanceForm'

export default function App() {
  // Form tambah dan edit menggunakan komponen yang sama, dibedakan melalui parameter ID.
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/attendance" replace />} />
      <Route element={<AdminLayout />}>
        <Route path="/attendance" element={<AttendanceList />} />
        <Route path="/attendance/create" element={<AttendanceForm />} />
        <Route path="/attendance/edit/:id" element={<AttendanceForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/attendance" replace />} />
    </Routes>
  )
}
