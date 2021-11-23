import React, {useEffect, useState} from 'react';
import './styles/styles.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import {MdMyLocation} from 'react-icons/md'

function App() {

  const API_KEY = 'd45746fdd0c6436f874b3fe49df4118b'
  const API_URL ='https://api.openweathermap.org/data/2.5/'

  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
 

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  

  const search = (e) => {
    if(e.key === "Enter") {
      fetch(`${API_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
        });
    }
  }

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition( savePositionToState);
      const result = await axios.get(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${API_KEY}`);
      setWeather(result.data);
      setCity('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);


  return (
    <div className = "app-conteiner">
      <header>
        <a href="/" className = "logo"> Good Weather</a>
      </header>
      <div className = "search-conteiner">
        <div className = "input-box">
          <input
              type="text"
              placeholder = "Enter city" 
              onChange = {e => setCity(e.target.value)}
              value = {city}
              onKeyPress = {search}
              />
              <a 
                className = "location-icon" 
                href = "#" 
                onClick={fetchWeather}><MdMyLocation/>
              </a>
        </div>
      </div>
      <div className = "data-conteiner">
        {(typeof weather.main != 'undefined') ? (
          <WeatherCard
            name = {weather.name}
            type = {weather.weather[0].main}
            temp = {weather.main.temp}/>
        ) : 
        <WeatherCard
          name = "City"
          type = "Type"
          temp = "Temperature"/>}
      </div>
    </div>
  );
}

export default App;
