import React from 'react'
import { useEffect, useState } from 'react'
import weather from '../services/weather'

const Weather = ({ city, latlon}) => {
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    weather.getWeather(latlon.latlng[0], latlon.latlng[1])
      .then(
        response => {

          setTemperature(response.data.main.temp)
          setWind(response.data.wind.speed)
          setIcon(response.data.weather[0].icon)
        }
      )
  }, [])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: {Math.round((temperature - 274.15) * 100) / 100} &#8451;</p>
      <img src={` https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
      <p>wind: {wind} m/s</p>
    </div>
  )
}

export default Weather