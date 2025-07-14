import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import DashboardLayoutNoMiniSidebar from './components/Sidebar'
import Login from './pages/Login'
import Signup from './pages/Register'
import Dashboard from './components/dashboard/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<DashboardLayoutNoMiniSidebar />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
