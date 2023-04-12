import { useState } from "react";
import "./App.css";
import axios from "axios"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f6b4f995f6c5142b0aaefe0f47bfacfe&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(URL)
        .then((response) =>{
          setData(response.data);
          setErrorMessage(null);
        })
        .catch((error) => {
          if (error.response.data.message === "city not found") {
            setErrorMessage("Please enter a valid city name");
          }
        })
      setLocation("");
    }
  };


 
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyDown={searchLocation}
          type="search"
          placeholder="Search for a city"
        />
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </div>
      <div className="container">
        <div className="top-bar">
          <h1>{data.name}</h1>
          <span className="time">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="temp">
          {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom-bar">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}KMP</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
