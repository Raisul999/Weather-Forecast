import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forecast from "./components/Forecast";
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
    <div
      className={`py-1 px-10 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()} overflow-hidden sm:py-5 px-32`}
    >
      {/* <TopButton setQuery={setQuery} /> */}
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
  );
}

export default App;
