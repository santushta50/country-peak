import { Link } from 'react-router-dom'
import '../styles/App.css'

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page not found</h2>
      <p>Sorry, we could not find the page you were looking for.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound
