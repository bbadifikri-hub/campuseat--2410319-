import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { NavLink, useNavigate } from 'react-router'

export function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    // Padam recently viewed user ini SEBELUM logout
    if (user) {
      localStorage.removeItem(`ce-recent-${user.uid}`)
    }
    await logout()
    navigate('/')
  }

  return (
    <header>
      <h1>CampusEats</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        {user ? (
          <>
            <span className="user-name">Hi, {user.displayName || user.email}</span>
            <button type="button" className="link" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  )
}