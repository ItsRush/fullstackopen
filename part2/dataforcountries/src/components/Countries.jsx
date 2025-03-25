 import Country from './Country';

 const Countries =({country,countriesToShow,handleShowCountry})=>{
    return(
        <div>
        {countriesToShow.map(country =>
          <div key={country.name.common}>{country.name.common}<button onClick={()=>handleShowCountry(country)}>Show</button></div>
        )}

      </div>
    )
 }

 export default Countries;