import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import CountryCard from '../components/CountryCard'

function Favourites() {
  const { favourites } = useFavourites()

  if (favourites.length === 0) {
    return (
      <div className="not-found">
        <h2>No Favourites Yet</h2>
        <p>You haven't saved any countries to your favourites.</p>
        <Link to="/" className="back-btn" style={{ display: 'inline-block' }}>
          Explore Countries
        </Link>
      </div>
    )
  }

  return (
    <div className="home">
      <h2 style={{ marginBottom: '24px' }}>Your Saved Countries</h2>
      <div className="cards-grid">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
