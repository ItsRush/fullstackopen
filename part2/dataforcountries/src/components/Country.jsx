const Country = ({countries, search, handleButton}) => {
    //if search has a value use filter, if it doesnt show an empty array
    
    const filteredCountries = search ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())) : []


 


    if(filteredCountries.length > 20 ){
        return (
            <p>Too many matches specify another filter</p>
        )
    }
    else if(filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>{country.capital} <br></br>{country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => 
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src = {country.flags.png}/>
            </div>
        )
    }
    else if (filteredCountries.length <= 20 && filteredCountries.length > 0){
        return (
        <ul>
            {filteredCountries.map(country => 
                <li key = {country.cca2}>
                    {country.name.common} <button onClick={() =>handleButton(country)}>Show</button>
                </li>
            )}
            
        </ul>
        )
    }


    return null
    
}

export default Country;