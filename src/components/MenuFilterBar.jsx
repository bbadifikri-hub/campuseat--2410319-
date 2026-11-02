import { useState } from 'react'

const CATEGORIES = ['All', 'Mains', 'Sides', 'Drinks']

function MenuFilterBar({ onSearch, onCategoryChange, activeCategory }) {
  const [query, setQuery] = useState('')

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)
    onSearch(value)            // hantar naik ke VendorPage
  }

  function handleCategory(cat) {
    onCategoryChange(cat)      // hantar naik ke VendorPage
  }

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      {/* Carian */}
      <label htmlFor="menu-search" style={{ fontWeight: 'bold', fontSize: '14px' }}>
        Search menu
      </label>
      <input
        id="menu-search"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Cari nama menu... (cth: Nasi Lemak)"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #c5cbd3',
          borderRadius: '8px',
          marginTop: '5px',
          marginBottom: '15px',
          font: 'inherit',
        }}
      />

      {/* Butang kategori */}
      <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 8px 0' }}>
        Filter by category
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid #2a9d8f',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              backgroundColor: activeCategory === cat ? '#2a9d8f' : 'white',
              color: activeCategory === cat ? 'white' : '#2a9d8f',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MenuFilterBar