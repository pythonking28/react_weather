//  api.openweathermap.org/data/2.5/weather?q=pune&appid=04e699ddbb816080468a5e2bc739bc6e 

import React,{useState, useEffect} from 'react'
import "./style.css"
import WeatherCard from './weatherCard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState("janakpur");
    const [tempInfo,setTempInfo] = useState("");
    const getWeatherInfo = async () =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${ searchValue }&appid=c9acdc22523e6fd67fc142818bf78768&units=metric`
            let res = await fetch(url);
            let data = await res.json();
            console.log(data);
            const {temp,humidity,pressure} = data.main
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country,sunset} = data.sys;
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, [])
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
                    <button className="searchButton" type="button" onClick={()=>getWeatherInfo()}>Search</button>
                </div>
            </div>
            {/* temperature card */}
            <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Temp
