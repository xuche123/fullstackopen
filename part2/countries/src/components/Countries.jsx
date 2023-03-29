import Country from "./Country"
import { useState } from 'react'

const Countries = ({ countries, setFilteredCountries }) => {


    if (countries.length == 0) {
        return null
    }
    else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => setFilteredCountries([country])}>show</button>
                    </div>)}
            </div>
        )
    }
    else {
        return <Country country={countries[0]} />
    }
}

export default Countries