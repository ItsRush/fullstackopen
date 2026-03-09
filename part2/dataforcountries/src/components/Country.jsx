const Country = ({country, weather}) => {
    console.log('weather:', weather);
    if(!country || !weather){
        return null
    }

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <div>
                <img src={country.flags.png} />
            </div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country;