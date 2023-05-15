import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Card = () => {
    const [weather, setWeather ] = useState('');
    const [value, setValue] = useState ("Ciudad");
    const [citys, setCitys] = useState (["London", "Paris", "New York", "Bogota"]);
    const [changeButton, setChangeButton] = useState (0);
    const [time, setTime] = useState ("");
    const [localTime, setLocalTime] = useState (new Date().toLocaleTimeString());

    const celsius = (kelvin) =>{
        const temp = Math.floor(kelvin - 273.15); 
        return `${temp}°C`;
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            const crd = pos.coords;
            document.getElementById("loader").classList.add('hide')
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ff824b7170f955795467adaaf92e00f0`)
                .then(res => setWeather(res.data))
                .catch(error => console.log(error));
        }

        for (const city in citys) {
            if(typeof city=== "string") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citys[city]}&appid=ff824b7170f955795467adaaf92e00f0`)
            .then(res => citys.splice(city, 1, res.data))
            .catch(error => console.log(error));
            }{
            console.log(typeof city)
            }
        }

    },[])
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff824b7170f955795467adaaf92e00f0`)
        .then(res => {
            document.getElementById("loader").classList.remove('hide')
            setWeather(res.data);
        })
        .finally(res => {
            setTimeout(() => {
                document.getElementById("loader").classList.add('hide')
            }, "2000");
        })
        .catch(error => setWeather(error));
        
        if(changeButton!=0){
            axios.get(`https://timezone.abstractapi.com/v1/current_time/?api_key=5a4930fe3fbf48288431a5c947e85670&location=${value}`)
                .then(res => {
                    setTime(res.data.datetime);
                })
                .catch(error => console.log(error));        
        }
    },[changeButton])

    return (
        <div className='container'>
           <form className='search' action="">
                <input 
                    className='search__input' 
                    onChange={(e) => {
                    setValue(e.target.value);   
                    }} 
                    type="text" 
                    name="" 
                    id="" 
                    value={value}
                    placeholder="Buscar..."
                />
                <button 
                    className='search__button'
                    onClick={(e) => {
                    e.preventDefault();
                    setChangeButton(changeButton + 1);
                    }} 
                    type='submit'
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
           </form>

            <section className='card'>
            {
                citys.map(city => {
                    return (
                    <div key={city.name} className='card__element'>
                        <h3>{city.name}</h3>
                        <img className='card__icon' src={`https://openweathermap.org/img/wn/${city.weather?.[0].icon}@2x.png`} alt="" />
                        <p>{celsius(city.main?.temp)}</p>
                    </div>)

                })
            }
            </section>
            <section className='weather'>
            <h3 className='weather__temp'>{celsius(weather.main?.temp)}</h3>
            <img className='weather__icon' src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="" />
            </section>
            <section className='location'>
            <h1>{weather.coord   ? weather.name : weather.response?.data?.message}</h1>
            {/* <p className='time__text'>{`${time.slice(0,4)} ${time.slice(8)}` }</p> */}
            <p className='time__text'>{changeButton > 0  ? `${time.slice(11,16)} ${time.slice(5,10)}`: localTime.includes("M") ? `${localTime.slice(0,4)} ${localTime.slice(-2)}` : `${localTime}` }</p>
            </section>
            <p className='app'>Weather App</p>
        </div>
    );
};

export default Card;
