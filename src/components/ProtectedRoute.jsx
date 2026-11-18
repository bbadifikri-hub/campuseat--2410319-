import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Loading } from './Status.jsx'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading /> // Penting: Check loading dulu
  
  // Kalau takde user, tendang ke /login, ingat dari mana dia datang
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet /> // Kalau ada user, benarkan masuk
}