import Countries from './Countries'
import Country from './Country'
import Weather from './Weather'

const CountryFilter = ({countriesToShow,filter,handleShowCountry,weather }) => {
    if(filter === '') {
        return
    }
    if ( countriesToShow.length > 10 ){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }else if ( countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <Countries countriesToShow={countriesToShow} handleShowCountry={handleShowCountry}/>
        )
    }else if ( countriesToShow.length === 1){
        return (
            <Country country={countriesToShow[0]} weather={weather}/>
        )
}
return null
}

export default CountryFilter;