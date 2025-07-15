import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {

    const [weather_data, setweather_data] = useState(false);
    const [query, setQuery] = useState("delhi")

    const allIcon = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    const search = async (city) => {
        try {
            //    const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=db96b0a612db9944a5c759e235b49eab`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcon[data.weather[0].icon] || clear_icon;
            setweather_data({
                humidity: data.main.humidity,
                wind: data.main.wind,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        search()
        setQuery("")
    }, [])

    function clickTosearch() {
        search()
        setQuery("")
    }

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='search' value={query} onChange={(e)=> setQuery(e.target.value)}/>
                <img src={search_icon} alt="" onClick={clickTosearch}/>
            </div>
            <img src={weather_data.icon} alt="weather-icon" />
            <p className="temperature">{weather_data.temperature}°C</p>
            <p className="location">{weather_data.location}</p>
            <div className="weather-data">
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weather_data.humidity}</p>
                        <span>humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weather_data.wind}km/h</p>
                        <span>wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather