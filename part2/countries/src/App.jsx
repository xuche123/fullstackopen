import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import getAll from './services/countries'
import Search from './components/Search'

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAll()
      .then(
        response => {
          setCountries(response)
        }
      )
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const countriesToShow = search ? countries.filter(country => {
      return country.name.common.toLowerCase().includes(search.toLowerCase())
    }) : []
    setFilteredCountries(countriesToShow)
  }

  return (
    <div>
      <Search handleChange={handleSearch} />
      <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App
