import Languages from "./Languages"
import Flag from "./Flag"
import Weather from "./Weather"

const Country = ({ country}) => {
   
    // console.log(country.capitalInfo)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages</h4>
            <Languages languages={country.languages} />
            <Flag flag={country.flags.png} />
            <Weather latlon={country.capitalInfo} city={country.capital} />
        </div>
    )
}

export default Country