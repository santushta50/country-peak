import { useParams, useNavigate } from 'react-router-dom'
import useCountry from '../hooks/useCountry'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) {
    return <p className="page-status">Loading...</p>
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
  }

  if (!country) {
    return null
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country

  const languageNames = languages ? Object.values(languages).join(', ') : 'N/A'
  const currencyNames = currencies
    ? Object.values(currencies)
        .map((c) => c.name)
        .join(', ')
    : 'N/A'

  return (
    <div className="country-page">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          className="country-page__flag"
          src={flags.svg}
          alt={`Flag of ${name.common}`}
        />

        <div className="country-page__info">
          <h2 className="country-page__name">{name.common}</h2>
          <p className="country-page__official">{name.official}</p>

          <div className="country-page__details">
            <div>
              <p>
                <span>Population:</span> {population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {region}
              </p>
              {subregion && (
                <p>
                  <span>Subregion:</span> {subregion}
                </p>
              )}
              {capital && (
                <p>
                  <span>Capital:</span> {capital[0]}
                </p>
              )}
            </div>

            <div>
              <p>
                <span>Languages:</span> {languageNames}
              </p>
              <p>
                <span>Currencies:</span> {currencyNames}
              </p>
            </div>
          </div>

          {borders && borders.length > 0 && (
            <div className="borders-section">
              <p>
                <span>Bordering Countries:</span>
              </p>
              <div className="borders-list">
                {borders.map((border) => (
                  <span key={border} className="border-badge">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
