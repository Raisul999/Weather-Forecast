import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forecast from "./components/Forecast";
import TopButton from "./components/TopButton";
import getFormattedWeatherData from "./services/weatherService";
import { toast } from "react-toastify";

function App() {
  const [query, setQuery] = useState({ q: "Dhaka" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });

        setWeather(data);
      } catch (e) {
        toast.error(e.response?.data?.message);
      }
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) {
      return "from-cyan-700 to-blue-700";
    }

    let threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700";
    }

    return "from-yellow-700 to-orange-700";
  };

  return (
    <>
      {!weather ? (
        <div
          aria-label="Loading..."
          role="status"
          className="flex flex-row justify-center items-center h-screen bg-slate-700"
        >
          <svg
            className="h-10 w-10 animate-spin stroke-white"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-white">Loading...</span>
        </div>
      ) : (
        <div
          className={`py-1 px-10 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()} overflow-hidden sm:py-5 px-32 md:h-screen md:overflow-auto`}
        >
          <TopButton setQuery={setQuery} />
          <Input setQuery={setQuery} units={units} setUnits={setUnits} />
          {weather && (
            <div>
              <TimeAndLocation weather={weather} />
              <TempratureAndDetails weather={weather} units={units} />
              <Forecast
                title="Hourly forecast"
                items={weather.hourly}
                units={units}
              />
              <Forecast
                title="Daily forecast"
                items={weather.daily}
                units={units}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
