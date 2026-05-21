import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function CountryCard({ country }) {
  const { name, flags, population, region, capital, cca3 } = country
  const { favourites, dispatch } = useFavourites()

  const isSaved = favourites.some((f) => f.cca3 === cca3)

  const handleFavouriteClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isSaved) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: cca3 })
    } else {
      dispatch({ type: 'ADD_FAVOURITE', payload: country })
    }
  }

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img
        className="card__flag"
        src={flags.svg}
        alt={`Flag of ${name.common}`}
      />
      <div className="card__body">
        <h3 className="card__name">{name.common}</h3>
        <p>
          <span>Population:</span> {population.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {region}
        </p>
        <p>
          <span>Capital:</span> {capital?.[0] ?? 'N/A'}
        </p>
        <button
          className={`fav-btn ${isSaved ? 'fav-btn--saved' : ''}`}
          onClick={handleFavouriteClick}
          aria-label={isSaved ? `Remove ${name.common} from favourites` : `Save ${name.common} to favourites`}
          aria-pressed={isSaved}
        >
          {isSaved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
    </Link>
  )
}

export default CountryCard
