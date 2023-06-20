import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const SingleCountry = ({data}) => {
    console.log('single data',data)
    console.log('apikey',import.meta.env.VITE_SOME_KEY);
    const [weatherData,setweatherData] = useState()
    const [iconId ,setIconId] = useState(0)
    const [temp ,setTemp] = useState(0)
    const [wind ,setWind] = useState(0)
    console.log('weatherFinalData',weatherData);
    
    const dataArray = Object.entries(data[0].languages);
   

    const renderLanguage = dataArray.map(([key, value]) => {
        
        return (
            <li>{value}</li>
        ); 
      });
const getWeatherData=()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data[0].name.common}&appid=${import.meta.env.VITE_WEATHER_KEY}`).then(response=>{
        setweatherData(response.data)
        setIconId(` https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png` )
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
    })
}

useEffect(getWeatherData,[])
  return (
    <div>
        <h1>{data[0].name.common}</h1>
        <p>Capital: {data[0].capital[0]}</p>
        <p>Area: {data[0].area}</p>
        <h2>Languages</h2>
        <ul>
            {renderLanguage}
        </ul>
        <img src={data[0].flags.png} />
        <h1>Weather in {data[0].capital[0]}</h1>
        <p>Temperature is {Math.floor(temp - 273.15)} Celcius </p>
        <img style={{width:190,height:190}} src={iconId}></img>
        <p>Wind is {wind} m/s</p>
    </div>
  )
}

export default SingleCountry

