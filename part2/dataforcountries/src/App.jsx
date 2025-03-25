import { useState,useEffect } from 'react'
import countryService from './services/countryService'
import Country from './components/Country'
import Countries from './components/Countries'
import CountryFilter from './components/CountryFilter'
import weatherService from './services/weatherService'
import Weather from './components/Weather'

const App =()=> {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('')
  
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleShowCountry = (country) => {
    console.log('show', country)
    setFilter(country.name.common)
  }
  
  const countriesToShow = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    useEffect(() => {
      console.log('effect')
      countryService
        .getAll()
        .then(response => {
          console.log('promise fulfilled', response.data)
          setAllCountries(response.data)
        
       })
    }, [])

    useEffect(() => {
      console.log('weather effect')
      weatherService
        .getWeather()
        .then(response => {
          console.log('promise fulfilled', response.data)
          setWeather(response.data)
       })
    }, [])
  
  return (
<div>
find countries <input value={filter} onChange={handleFilter} />
<CountryFilter countriesToShow={countriesToShow} filter={filter} handleShowCountry={handleShowCountry} weather={weather}/>
</div>
  )
}

export default App
