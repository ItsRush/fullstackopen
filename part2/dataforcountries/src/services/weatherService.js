import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const getWeather = () => {
    const url = `${baseUrl}?q=London&appid=${apiKey}&units=metric`;
    return axios.get(url);
}

export default { getWeather }