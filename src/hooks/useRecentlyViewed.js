import { useLocalStorage } from './useLocalStorage.js'
import { useAuth } from './useAuth.js'

const MAX_ITEMS = 5

export function useRecentlyViewed() {
  const { user } = useAuth()

  // Per-user key; guest guna key sementara yang tak kekal
  // (guest: key unik supaya useState tak campur, tapi kita tak simpan)
  const storageKey = user ? `ce-recent-${user.uid}` : 'ce-recent-guest'

  const [recent, setRecent] = useLocalStorage(storageKey, [])

  function addRecent(item, vendor) {
    // Guest: jangan simpan — hanya rekod dalam memori (state sahaja)
    if (!user) return

    const entry = {
      id: item.id,
      name: item.name,
      price: item.price,
      vendorId: vendor.id,
      vendorName: vendor.name,
    }
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