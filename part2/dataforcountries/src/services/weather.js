import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY
const baseURL = 'https://api.openweathermap.org/data/2.5'

const getWeather = (lat, lon) => {
    const url = `${baseURL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default {
    getWeather
}