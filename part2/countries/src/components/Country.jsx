import Languages from "./Languages"
import Flag from "./Flag"

const Country = ({ country}) => {

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages</h4>
            <Languages languages={country.languages} />
            <Flag flag={country.flags.png} />
        </div>
    )
}

export default Country