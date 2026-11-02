function CartItem({ line, onChangeQty, onRemove }) {
  // Ambil item dan qty dari 'line'
  const { item, qty = 1 } = line || {};

  // Keselamatan tambahan kalau item undefined
  if (!item) return null;

  return (
    <li 
      className="cart-line" 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 0', 
        borderBottom: '1px solid #eee' 
      }}
    >
      {/* Nama & Harga Satuan */}
      <div style={{ flex: 1 }}>
        <p className="cart-name" style={{ margin: 0, fontWeight: 'bold' }}>
          {item.name}
        </p>
        <p className="muted" style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          RM {item.price.toFixed(2)} each
        </p>
      </div>
      
      {/* Butang - / + dan Kuantiti */}
      <div 
        className="qty" 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 20px' }}
      >
        <button 
          type="button" 
          onClick={() => onChangeQty(item.id, qty - 1)} // Kurang 1
          style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          −
        </button>
        
        <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
          {qty}
        </span>
        
        <button 
          type="button" 
          onClick={() => onChangeQty(item.id, qty + 1)} // Tambah 1
          style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          +
        </button>
      </div>
      
      {/* Total Harga untuk item ini */}
      <p 
        className="line-total" 
        style={{ margin: 0, fontWeight: 'bold', width: '90px', textAlign: 'right' }}
      >
        RM {(item.price * qty).toFixed(2)}
      </p>
      
      {/* Butang Remove */}
      <button 
        type="button" 
        className="link danger" 
        onClick={() => onRemove(item.id)}
        style={{ marginLeft: '20px', background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem