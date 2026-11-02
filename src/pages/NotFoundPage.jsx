import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section>
      <h2>404 — Not Found</h2>
      <p>No page here.</p>
      <Link to="/">Back home</Link>
    </section>
  )
}