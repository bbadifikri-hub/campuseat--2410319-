import {BrowserRouter, Routes, Route}  from 'react-router'
import {CartProvider}  from './context/CartProvider.jsx'
import  {Layout} from './components/Layout.jsx'
import  HomePage  from './pages/HomePage.jsx'
import VendorPage  from './pages/VendorPage.jsx'
import  CartPage  from './pages/CartPage.jsx'
import OrdersPage  from './pages/OrdersPage.jsx'
import  NotFoundPage  from './pages/NotFoundPage.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export default function App() {
  return (
<BrowserRouter>
  <AuthProvider>       {/* BARU: Bungkus Auth di luar */}
    <CartProvider>     {/* Cart Provider awak kekal di dalam */}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="vendor/:id" element={<VendorPage />} />
          
          {/* Route Awam */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Route Dilindungi (Kena Login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </AuthProvider>
</BrowserRouter>
  )
}