import {useState, useEffect} from 'react'
import countryService from './services/countryService'
import Country from './components/Country'


const App = () => {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  useEffect (() => {
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  if(!countries){
    return null
  } 

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleButton = (country) => {
    setSearch(country.name.common)
  }

  return (
    <>
    find countries <input value = {search} onChange={handleSearch}></input>
    <Country search = {search} countries={countries} handleButton={handleButton}/>
    </>
  )

}

export default App;