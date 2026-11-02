import { useLocalStorage } from './useLocalStorage.js'

const MAX_ITEMS = 5

export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage('campuseats-recent', [])

  function addRecent(item, vendor) {
    const entry = {
      id: item.id,
      name: item.name,
      price: item.price,
      vendorId: vendor.id,
      vendorName: vendor.name,
    }
    // Buang entri lama yang sama, letak di depan, hadkan 5
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.id !== item.id)
      return [entry, ...filtered].slice(0, MAX_ITEMS)
    })
  }

  function clearRecent() {
    setRecent([])
  }

  return { recent, addRecent, clearRecent }
}