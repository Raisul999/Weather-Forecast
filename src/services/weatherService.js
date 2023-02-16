import axios from "axios"
import { DateTime } from "luxon"
const BASE_URL = `https://api.openweathermap.org/data/2.5`
const API_KEY = 'b2928ffc9882dde5ff54df1c885f2960'

const getWeatherData = async (infoType, searchParams) => {
   const url = new URL(BASE_URL + "/" + infoType)
   url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
   console.log(url)
   const data = await axios.get(url)
   console.log(data.data)
   return data.data
}

const formatCurrentWeather = (data) => {
   const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed }
   } = data

   const { main: details, icon } = weather[0]

   return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, weather, speed, details, icon }
}

const formatForecastWeather = (data) => {
   let { timezone, daily, hourly } = data

   daily = daily.slice(1, 7).map(d => {
      return {
         title: formatToLocalTime(d.dt, timezone, 'ccc'),
         temp: d.temp.day,
         icon: d.weather[0].icon
      }
   })

   hourly = hourly.slice(1, 7).map(d => {
      return {
         title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
         temp: d.temp,
         icon: d.weather[0].icon
      }
   })

   return { timezone, daily, hourly }

}

const getFormattedWeatherData = async (searchParams) => {
   const formattedCurrentWeather = await getWeatherData('weather', searchParams)
   const formatted = formatCurrentWeather(formattedCurrentWeather)
   const { lat, lon } = formatted
   const formattedForecastWeather = await getWeatherData('onecall', {
      lat, lon, exclude: 'current,minutly, alerts', units: searchParams.units
   })

   const formattedForecast =  formatForecastWeather(formattedForecastWeather)
   return {...formatted, ...formattedForecast}
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy'") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode=(code)=>`http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}