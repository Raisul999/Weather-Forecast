import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const Input = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    } else {
      alert("Please enter a city name ");
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    let selectedunit = e.target.name;

    if (units !== selectedunit) {
      setUnits(selectedunit);
    }
  };
  return (
    <div className="flex flex-col justify-center my-6">
      <div className="flex justify-center items-center space-x-4">
        <input
          type="text"
          className="text-md font-light p-2 max-auto shadow-xl focus:outline-none capitalize sm:w-full"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button>
            <UilSearch
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125"
              onClick={handleSearch}
            />
          </button>
          <button>
            <UilLocationPoint
              className="text-white cursor-pointer transition ease-out hover:scale-125"
              onClick={handleLocation}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          name="metric"
          className="text-xl text-white font-light hover:scale-110 duration-200"
          onClick={handleUnitsChange}
        >
          &deg;C
        </button>
        <p className="text-white px-2">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light hover:scale-110 duration-200"
          onClick={handleUnitsChange}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default Input;
