import { useEffect, useState } from "react";
import "./App.css";
import OpenMap from "./components/openMap";
import API from "./api";
function App() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];

          setLocation(coords);
          handleWeather(coords);
        },
        () => {
          setLocation([0, 0]);
          handleWeather([0, 0]);
        }
      );
    } else {
      setLocation(setLocation([0, 0]));
      handleWeather([0, 0]);
    }
  }, []);

  function getWeatherGradient(tempCelsius) {
    if (tempCelsius <= 0) {
      return (
        ",rgba(" +
        (50 + tempCelsius / 2) +
        "," +
        (110 + tempCelsius) +
        "," +
        (200 - tempCelsius / 2) +
        ", 1),rgba(110, 160, 210, 0.8)"
      );
    }
    if (tempCelsius <= 10) {
      return (
        ",rgba(" +
        (100 - tempCelsius * 3) +
        "," +
        (160 - tempCelsius) +
        "," +
        (200 + tempCelsius) +
        ", 1),rgba(230, 230, 250, 0.8)"
      );
    } else if (tempCelsius >= 40) {
      return (
        ",rgba(" +
        (230 + tempCelsius / 4) +
        "," +
        (130 - tempCelsius * 2) +
        "," +
        (130 - tempCelsius * 2) +
        ", 1),rgba(255, 200, 152,0.8)"
      );
    } else if (tempCelsius >= 25) {
      return (
        ",rgba(" +
        (130 + tempCelsius * 3) +
        "," +
        (230 - tempCelsius * 3) +
        "," +
        (200 - tempCelsius * 4) +
        ", 1),rgba(255, 230, 192,0.8)"
      );
    } else {
      return (
        ",rgba(" +
        (20 + tempCelsius * 6) +
        "," +
        (190 + tempCelsius) +
        "," +
        (200 - tempCelsius * 6) +
        ", 1),rgba(180, 250, 180, 0.8)"
      );
    }
  }

  const handleWeather = async (loc) => {
    const d = await API.getWeather(loc);
    setData(d);
  };

  return (
    <>
      <div className="map-container">
        {location ? (
          <OpenMap location={location} setLocation={setLocation} />
        ) : (
          <div></div>
        )}
        <button className="btn" onClick={() => handleWeather(location)}>
          → click to see the weather on map ←
        </button>

        {Object.keys(data).length == 0 ? (
          <div></div>
        ) : (
          <div className="weather-container">
            <p className="info">
              {data.city.country} &nbsp; {data.city.name}{" "}
            </p>
            <div>
              {data.list.map((wList, index) => {
                const date = new Date(wList.dt_txt);
                var iconcode = wList.weather[0].icon;
                var iconurl =
                  "http://openweathermap.org/img/w/" + iconcode + ".png";
                const gradient = getWeatherGradient(
                  Math.round(wList.main.temp - 273)
                );

                return (
                  <div
                    className="weather-list-item"
                    style={{
                      background: `linear-gradient(to right ${gradient} )`,
                    }}
                    key={index}
                  >
                    <div>
                      <p>
                        {date.getDate()}-{date.getMonth() + 1}-
                        {date.getFullYear()}
                      </p>
                      <p>
                        {" "}
                        {date.getHours().toString().padStart(2, "0")}:
                        {date.getMinutes().toString().padStart(2, "0")}
                      </p>
                    </div>

                    <div>
                      <p>{wList.weather[0].main}</p>
                      <p>{wList.weather[0].description}</p>
                    </div>

                    <p>{Math.round(wList.main.temp - 273)}°</p>
                    <p>feels like {Math.round(wList.main.feels_like - 273)}°</p>
                    <p>wind speed {wList.wind.speed}</p>
                    <img src={iconurl} className="weather-icon" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
