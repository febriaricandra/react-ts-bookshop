import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminHome from './pages/admin/Home'
import CommonLayout from './components/layouts/CommonLayout'
import AuthLayout from './components/layouts/AuthLayout'
import AdminLayout from './components/layouts/AdminLayout'
import Register from './pages/auth/Register'

export default function App() {
  return (
    <Routes>

      {/* Register & Login Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Common Routes */}
      <Route element={<CommonLayout />}>
        <Route path='/' element={<Home />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHome />} />
      </Route>

      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  )
}