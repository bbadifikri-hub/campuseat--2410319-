import { useCart } from '../hooks/useCart.js'
import { Link } from 'react-router'

export default function OrdersPage() {
  const { orders } = useCart()

  if (!orders || orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', marginTop: '20px', padding: '40px' }}>
        <h2>No orders yet</h2>
        <p className="muted">You haven't placed any orders.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '15px', textDecoration: 'none', width: 'auto' }}>
          Order Now
        </Link>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Your Orders</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #ddd' }}>
            
            {/* Header Order */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#2a9d8f' }}>Order {order.id}</h3>
                <p className="muted" style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                  {new Date(order.createdAt).toLocaleString('en-MY')}
                </p>
              </div>
              <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                Placed
              </div>
            </div>

            {/* Senarai Item */}
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>Items:</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {order.items.map((item) => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#555' }}>
                    <span>
                      <strong style={{ color: '#333' }}>{item.qty || 1}x</strong> {item.name} 
                      {item.vendorName && <span style={{ fontSize: '12px', color: '#888' }}> ({item.vendorName})</span>}
                    </span>
                    <span>RM {(item.price * (item.qty || 1)).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Order */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <div style={{ fontSize: '14px', color: '#555' }}>
                <p style={{ margin: '0 0 5px 0' }}><strong>Name:</strong> {order.name}</p>
                <p style={{ margin: '0 0 5px 0' }}><strong>Mahallah:</strong> {order.mahallah}</p>
                <p style={{ margin: 0 }}><strong>Pickup Time:</strong> {order.pickupTime}</p>
              </div>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#e63946' }}>
                Total: RM {order.total.toFixed(2)}
              </h3>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}