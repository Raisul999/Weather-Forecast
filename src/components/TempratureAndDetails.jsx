import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'
const TempratureAndDetails = ({ weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone } }) => {
        return (
                <div className='text-center '>
                        <div className='flex flex-col items-center justify-center py-3 text-xl text-cyan-300 sm:flex-row'>

                                {details}
                        </div>
                        <div className='flex flex-col items-center justify-around text-white py-3 sm:flex-row'>
                                <img
                                        src={iconUrlFromCode(icon)}
                                        alt='weather icon'
                                        className='w-20'
                                />
                                <p className='text-5xl'>
                                        {Math.floor(temp)}
                                </p>
                                <div className='flex flex-col space-y-2'>
                                        <div className='flex font-light text-sm items-center justify-center'>
                                                <UilTemperature size={18} className='mr-1' />
                                                Feels:
                                                <span className='font-medium ml-1'>{Math.floor(feels_like)} &deg;C</span>
                                        </div>
                                        <div className='flex font-light text-sm items-center justify-center'>
                                                <UilTear size={18} className='mr-1' />
                                                Humidity:
                                                <span className='font-medium ml-1'>{humidity}%</span>
                                        </div>
                                        <div className='flex font-light text-sm items-center justify-center'>
                                                <UilWind size={18} className='mr-1' />
                                                Wind:
                                                <span className='font-medium ml-1'>{Math.floor(speed)} km/h</span>
                                        </div>

                                </div>
                        </div>
                        <div className='flex flex-row items-center justify-center space-x-0.5 text-white text-sm sm:space-x-1'>

                                <span><UilSun /></span>
                                <span className='font-light'>
                                        Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
                                </span>

                                <p className='font-light'>|</p>

                                <span><UilSunset /></span>
                                <p className='font-light'>
                                        Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
                                </p>

                                <p className='font-light'>|</p>

                                <span><UilArrowUp /></span>
                                <p className='font-light'>
                                        High: <span className='font-medium ml-1'>{Math.floor(temp_max)}&deg;C</span>
                                </p>

                                <p className='font-light'>|</p>

                                <span><UilArrowDown /></span>
                                <p className='font-light'>
                                        Low: <span className='font-medium ml-1'>{Math.floor(temp_min)}&deg;C</span>
                                </p>


                        </div>
                </div>
        )
}

export default TempratureAndDetails
