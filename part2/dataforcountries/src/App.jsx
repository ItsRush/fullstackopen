import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import weatherService from './services/weather'


const App = () => {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    if(selectedCountry){
      const [lat,lon] = selectedCountry.latlng
      weatherService
      .getWeather(lat,lon)
      .then(initialWeather => {
        setWeather(initialWeather)
      })
    }
  },[selectedCountry])
    
  if(!countries){
    return <div>Loading...</div>
  }

  console.log('countries:', countries);
  
  const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) : []

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch}/>
      <Countries filteredCountries={filteredCountries} handleShow={handleShow} selectedCountry={selectedCountry} weather={weather}/>
    </div>
  )
}
export default App