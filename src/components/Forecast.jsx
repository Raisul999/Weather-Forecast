import { iconUrlFromCode } from "../services/weatherService";

const Forecast = ({ title, items, units }) => {
  return (
    <div>
      <div className="flex text-center items-center justify-center mt-6 sm:justify-start">
        <p className="text-white font-medium uppercase ">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-grow items-center justify-around gap-3 text-white ">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt=""
              className="w-12 my-1"
            />
            <p className="font-medium">
              {Math.floor(item.temp)}
              {units == "metric" ? <span>&deg;C</span> : <span>&deg;F</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
