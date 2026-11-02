import { useCart } from '../hooks/useCart.js'
import { NavLink } from 'react-router'

export function Header() {
  const { count } = useCart()
  return (
    <header>
      <h1>CampusEats</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </header>
  )
}