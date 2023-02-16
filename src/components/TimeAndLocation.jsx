import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

const TimeAndLocation = ({weather:{dt, timezone, name, country}}) => {
        return (
                <div>
                        <div className='flex items-center justify-center my-3'>

                                <p className='text-md text-white font-extralight sm:text-xl'>
                                       {formatToLocalTime(dt, timezone)}
                                </p>
                        </div>


                        <div className='flex items-center justify-center my-3 mb-10'>
                                <p className='text-white text-xl font-medium sm:text-3xl'>
                                      {`${name}, ${country}` }
                                </p>
                        </div>
                </div>
        )
}

export default TimeAndLocation
