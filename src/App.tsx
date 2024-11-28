import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminHome from './pages/admin/Home'
import CommonLayout from './components/layouts/CommonLayout'
import AuthLayout from './components/layouts/AuthLayout'
import AdminLayout from './components/layouts/AdminLayout'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Details from './pages/Details'
import Carts from './pages/Carts'

export default function App() {
  return (
    <Routes>

      {/* Register & Login Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>

      {/* Common Routes */}
      <Route element={<CommonLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/books/:id' element={<Details />} />
        <Route path='/carts' element={<Carts />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHome />} />
      </Route>

      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  )
}