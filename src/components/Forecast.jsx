import { iconUrlFromCode } from "../services/weatherService"

const Forecast = ({ title, items }) => {
        return (
                <div>
                        <div className="flex text-center items-center justify-center mt-6 sm:justify-start">
                                <p className='text-white font-medium uppercase '>
                                        {title}
                                </p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex flex-grow items-center justify-around gap-3 text-white ">
                                {
                                        items.map((item) => (
                                                <div className="flex flex-col items-center justify-center">
                                                        <p className="font-light text-sm">
                                                                {item.title}
                                                        </p>
                                                        <img
                                                                src={iconUrlFromCode(item.icon)}
                                                                alt=""
                                                                className="w-12 my-1"
                                                        />
                                                        <p className="font-medium">
                                                                {Math.floor(item.temp)}&deg;C
                                                        </p>

                                                </div>
                                        ))
                                }

                        </div>
                </div>
        )
}

export default Forecast 