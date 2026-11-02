import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import MenuFilterBar from '../components/MenuFilterBar.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function VendorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vendors, loading, error } = useVendors()
  const { addToCart } = useCart()
  const { addRecent } = useRecentlyViewed()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="card error">
        <p>Vendor tidak dijumpai!</p>
        <button className="btn" onClick={() => navigate('/')}>Kembali ke Utama</button>
      </div>
    )
  }

  const filteredMenu = vendor.menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = activeCategory === 'All' || item.category === activeCategory
    return matchSearch && matchCategory
  })

  function handleViewItem(item) {
    // Rekod item yang dilihat (untuk Recently Viewed)
    addRecent(item, vendor)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
        <button
          className="btn"
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#2a9d8f', color: 'white', padding: '8px 15px', width: 'auto', flexShrink: 0 }}
        >
          ← Back
        </button>
        <div>
          <h2 style={{ margin: 0 }}>{vendor.name}</h2>
          <p className="muted" style={{ margin: 0 }}>{vendor.location}</p>
        </div>
      </div>

      <MenuFilterBar
        onSearch={setSearchTerm}
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      {filteredMenu.length === 0 ? (
        <p className="muted" style={{ textAlign: 'center', padding: '30px' }}>
          Tiada menu sepadan dengan carian anda.
        </p>
      ) : (
        <div className="vendors-grid">
          {filteredMenu.map((item) => (
            <div key={item.id} onClick={() => handleViewItem(item)}>
              <MenuItemCard
                item={item}
                onAdd={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: 1,
                    vendorId: vendor.id,
                    vendorName: vendor.name,
                  })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}