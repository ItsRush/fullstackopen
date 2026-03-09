import Country from './Country'

const Countries = ({filteredCountries, handleShow, selectedCountry, weather}) => {
  if(!filteredCountries){
    return null
  }
  if(selectedCountry){
    return <Country country={selectedCountry} weather={weather}/>
  }
  if(filteredCountries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }

  else if(filteredCountries.length === 1){
    setTimeout(() => {
      handleShow(filteredCountries[0])
    }, 0);
  }
  else if(filteredCountries.length <= 10){
    return(
      <div>
        {filteredCountries.map(country => 
          <li key={country.cca2}>{country.name.common} <button onClick={() => handleShow(country)}>Show</button></li>
        )}
      </div>
    )
  }


}

export default Countries