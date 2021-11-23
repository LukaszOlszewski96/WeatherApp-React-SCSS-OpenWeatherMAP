import React from 'react';
import {TiWeatherCloudy, TiWeatherSunny, TiWeatherSnow, TiWeatherShower} from 'react-icons/ti';


const WeatherCard = ({name, type, temp}) => {

    const getDate = (calendar) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[calendar.getDay()];
        let date = calendar.getDate();
        let month = months[calendar.getMonth()];
        let year = calendar.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
      }

    return (
        <div className = "card">
            <p className = "type">{type}</p>
            <p className = "icon">
                {type === "Clouds" && <TiWeatherCloudy/>}
                {type === "Clear" && <TiWeatherSunny/>}
                {type === "Snow" && <TiWeatherSnow/>}
                {type === "Rain" && <TiWeatherShower/>}
            </p>
            <p className = "temp">{Math.round(temp)}<span>°C</span></p>
            <h1 className = "city-name">{name}</h1>
            <p className = "date">{getDate(new Date())}</p>
        </div>
    )
}

export default WeatherCard
