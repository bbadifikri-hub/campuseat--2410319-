import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

export default function CartPage() {
  // Ambil data dan fungsi terus dari Context
  const { cart, changeQty, removeFromCart, placeOrder } = useCart()

  // Jika cart kosong
  if (cart.length === 0) {
    return (
      <p className="muted" style={{ marginTop: '20px' }}>
        Your cart is empty. Pick something from a menu first.
      </p>
    )
  }

  // Kira jumlah harga keseluruhan
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0)

  return (
    <div 
      className="cart-layout" 
      style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start', marginTop: '20px' }}
    >
      {/* Bahagian Kiri: Senarai Item */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Your Cart</h3>
        
        <ul className="cart-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              // Hantar keseluruhan item supaya CartItem boleh baca id, name, price DAN qty
              line={{ item, qty: item.qty || 1 }} 
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        
        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
        
        <p className="cart-total" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'right', margin: 0 }}>
          Total: RM {total.toFixed(2)}
        </p>
      </div>
      
      {/* Bahagian Kanan: Borang Checkout */}
      <div>
        <CheckoutForm onPlaceOrder={placeOrder} />
      </div>
    </div>
  )
}