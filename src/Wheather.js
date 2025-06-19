import React, { useState } from 'react'
import './App.css'

const api ={
    key :"f6c2298fc717dfb54fdbdb5084de3aef",
    base : "https://api.openweathermap.org/data/2.5"
}

const Wheather = () => {
    const [query,setQuery] =useState('')
    const [error,setError]=useState('')

    const[weather,setWeather] =useState({})
    const search=evt=>{
        if(evt.key==='Enter'){
            fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res=>res.json())
            .then(result=>{

                if(result.cod==404){
                    setError(result.message)
                    console.log(result.cod)
                    console.log(result.message)
                    setWeather({})

                }else{
                    setWeather(result)
                    setQuery('')
                    console.log(result)
                }
                setQuery('')
                


            })
        }
    }
    const dateBuilder=(d)=>{
        let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",  "December"]
        let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",  "Saturday"]

        let day =days[d.getDay()]
        let date =d.getDate()
        let month =d.getMonth()
        let year =d.getFullYear()
        
        return `${day} ${date} ${month} ${year}`
    }
   return (
    <div className='title'>
        <main>
            <div>
                <input type='text' placeholder='Search..' onChange={(e)=>setQuery(e.target.value)} onKeyPress={search}></input>

            </div>
            {/* If error is a non-empty string (truthy), it renders the <div> showing the error.

            If error is '' (empty string or falsy), it renders nothing. */}
            {error && <div style={{ color: 'red' }}>{error}</div>} 
            <div>
                {(typeof weather.main!=="undefined")?
                ( <>
                    <h2>Country Name : {weather.name}   </h2>
                    <h3>Country Temperature : {weather.main.temp}</h3>
                    <h3>Country Temperature Absolute : {Math.floor(weather.main.temp)}</h3>
                    <h3>Date: {dateBuilder(new Date())}</h3> 
                    <h3>Country Code : {weather.sys.country}</h3>  
                    <h3>Sky Condition : {weather.weather[0].main}</h3>
                </>
                ):('')}
               
            </div>
        </main>
    </div>
  )
}

export default Wheather
