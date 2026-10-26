import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import { useEffect, useState } from 'react'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)
  const [search, setSearch] = useState('')          // ← PINDAH KE SINI

  // Baru derived values
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const filteredMenu = selectedVendor
    ? selectedVendor.menu.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      )
    : []
  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0)

  // ... useEffect, handlers, return sama macam sekarang

  

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) setSelectedVendorId(data[0].id)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  function handleAdd(item) {
    setCart((prev) => {
      const found = prev.find((l) => l.item.id === item.id)
      if (found) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((l) => (l.item.id === itemId ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((l) => l.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, l) => sum + l.item.price * l.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => setReloadKey(k => k + 1)} />

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search menu…"
      />

      <main className="container">
        {view === 'menu' && (
          <>
            <section>
              <h2 className="section-title">Choose a vendor</h2>
              <div className="vendor-grid">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={vendor.id === selectedVendorId}
                    onSelect={setSelectedVendorId}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="section-title">
                Menu: {selectedVendor ? selectedVendor.name : 'Pilih vendor'}
              </h2>
              {selectedVendor && (
                <MenuList items={filteredMenu} onAdd={handleAdd} />
              )}
            </section>
          </>
        )}

        {view === 'cart' && (
          <CartPage
            cart={cart}
            onChangeQty={handleChangeQty}
            onRemove={handleRemove}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === 'done' && lastOrder && (
          <div className="card">
            <h2>Order placed!</h2>
            <p>Name: {lastOrder.name}</p>
            <p>Mahallah: {lastOrder.mahallah}</p>
            <p>Pickup time: {lastOrder.pickupTime}</p>
            <p>Total: RM {lastOrder.total.toFixed(2)}</p>
            <button className="btn" onClick={() => setView('menu')}>
              Back to menus
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App