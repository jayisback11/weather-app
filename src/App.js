import { useEffect, useState } from "react";
import "./App.css";
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Rainy from "./assets/rainy.jpg";
import Overcast from "./assets/overcast.jpg";
import Snow from "./assets/snow.jpg";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [place, setPlace] = useState("new york");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData({
          name: data.location.name,
          country: data.location.country,
          farenheit: {
            current: data.current.temp_f,
            high: data.forecast.forecastday[0].day.maxtemp_f,
            low: data.forecast.forecastday[0].day.mintemp_f
          },
          condition: data.current.condition.text
        });
      });
    setPlace("");
  };

  return (
    <div
      className="App"
      style={
        weatherData.condition?.toLowerCase() === "clear" || weatherData.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : weatherData.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : weatherData.condition?.toLowerCase().includes("rainy") ? { backgroundImage: `url(${Rainy})` } : weatherData.condition?.toLowerCase().includes("snow") ? { backgroundImage: `url(${Snow})` } : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="search-input">
        <input
          type="text"
          value={place}
          placeholder="Search place..."
          onChange={(e) => setPlace(e.target.value)}
        />
        <SearchIcon type="submit" fontSize="large" className="search-button" onClick={handleFetch} />
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1>{weatherData.farenheit?.current}° F</h1>
          <div className="condition-high-low">
            <h1>{weatherData.condition}</h1>
            <h1>{weatherData?.farenheit?.high}° F</h1>
            <h1>{weatherData?.farenheit?.low}° F</h1>
          </div>
        </div>
        <h2>
          {weatherData?.name}, {weatherData?.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
