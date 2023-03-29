import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';


const getWeather = async (lat, lon) => {

    return await axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
}

export default { getWeather };