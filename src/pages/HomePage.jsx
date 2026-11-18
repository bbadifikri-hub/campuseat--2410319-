import { useVendors } from '../hooks/useVendors.js'
import { useNavigate, Link } from 'react-router'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
import { useAuth } from '../hooks/useAuth.js' 
import VendorCard from '../components/VendorCard.jsx'

export default function HomePage() {
  const { vendors, loading, error } = useVendors()
  const { recent, clearRecent } = useRecentlyViewed()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {/* Recently viewed */}
      { user && recent.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>Recently viewed</h2>
            <button
              type="button"
              onClick={clearRecent}
              style={{ background: 'none', border: '1px solid #e63946', color: '#e63946', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
            >
              Clear
            </button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/vendor/${r.vendorId}`}
                  style={{ display: 'block', padding: '10px 14px', backgroundColor: '#e6f2f0', color: '#00685e', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                >
                  {r.name} <span style={{ fontWeight: 'normal', color: '#666', fontSize: '12px' }}>({r.vendorName})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <h2>Vendors</h2>
      <div className="vendors-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            isSelected={false}
            onSelect={(id) => navigate(`/vendor/${id}`)}
          />
        ))}
      </div>
    </div>
  )
}