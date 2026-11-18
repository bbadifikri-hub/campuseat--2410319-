import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue, enabled = true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (err) {
      console.error(`useLocalStorage read error for "${key}":`, err)
      return initialValue
    }
  })

  useEffect(() => {
    if (!enabled) return              // guest: jangan tulis
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`useLocalStorage write error for "${key}":`, err)
    }
  }, [key, value, enabled])

  return [value, setValue]
}