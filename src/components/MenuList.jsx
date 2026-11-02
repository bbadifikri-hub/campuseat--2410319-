import { useCart } from '../hooks/useCart.js'

export function MenuList({ vendor }) {
  const { addToCart } = useCart()

  return (
    <ul>
      {vendor.menu.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>${item.price.toFixed(2)}</p>
          <button
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                vendorId: vendor.id,
                vendorName: vendor.name,
              })
            }
            disabled={!item.available}
          >
            {item.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </li>
      ))}
    </ul>
  )
}