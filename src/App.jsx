import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import AttendanceList from './pages/AttendanceList'
import AttendanceForm from './pages/AttendanceForm'

export default function App() {
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
