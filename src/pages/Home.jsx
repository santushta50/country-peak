import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'
import '../styles/App.css'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      setCountries([])
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(() => {
      setLoading(true)
      fetch(`https://restcountries.com/v3.1/name/${trimmedQuery}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('No countries found.')
          }
          return res.json()
        })
        .then((data) => {
          setCountries(data)
          setError(null)
        })
        .catch((fetchError) => {
          if (fetchError.name === 'AbortError') {
            return
          }
          setCountries([])
          setError('No countries found.')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {loading && <p className="home__status">Loading...</p>}
      {error && <p className="home__status home__status--error">{error}</p>}

      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}

      {!loading && !error && countries.length === 0 && !query.trim() && (
        <p className="home__status">Start searching to explore countries.</p>
      )}
    </div>
  )
}

export default Home
