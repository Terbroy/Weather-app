import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [weather, setWeather] = useState('')
    const [kelvin, setKelvin] = useState ('')
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            const crd = pos.coords;
            document.getElementById('loader').classList.add('none')
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ff824b7170f955795467adaaf92e00f0`)
                .then(res => setWeather(res.data))
                .catch(error => console.log(error));
        }
    },[])

    console.log(weather);



    return (
        <div className='card'>
            <h1>Weather App</h1>
            <h3>{weather.name}, {weather.sys?.country}</h3>
            <div className="info">
                <div className='temperature'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                    <h2>{kelvin ? weather.main?.temp : Math.floor(weather.main?.temp-273.15)} {kelvin ? ' K' : ' °C'}</h2>
                </div>
                <div>
                    <h3>"{weather.weather?.[0].main}"</h3>
                    <h3>Wind speed: <b>{weather.wind?.speed} m/s</b></h3>
                    <h3>Clouds: <b>{weather.clouds?.all}%</b></h3>
                    <h3>Pressure: <b>{weather.main?.pressure} mb</b></h3>
                </div>
            </div>
            <button onClick={() => setKelvin(!kelvin)}>{kelvin ? 'Celsius' : 'Kelvin'}</button>
        </div>
    );
};

export default Card;