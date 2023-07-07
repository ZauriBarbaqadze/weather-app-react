import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles.scss";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=200da08ae9806e9460ed69a6f5d74f77&units=metric`;

  useEffect(() => {
    // Fetch default city data when component mounts
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Lagodekhi&appid=200da08ae9806e9460ed69a6f5d74f77&units=metric`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const searchFunction = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="App">
      <h1>Current Weather</h1>
      <div className="main">
        <input
          type="text"
          placeholder="City Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchFunction}
        />
        <div className="Info">
          {data.main && data.main.feels_like && (
            <h2 className="view">{Math.round(data.main.feels_like)}°C</h2>
          )}
          <h2 className="title">{data.name}</h2>
        </div>
        <div className="MoreInfo">
          <div className="wind">
            {data.wind && data.wind.speed && (
              <h2>{Math.round(data.wind.speed)} MPH</h2>
            )}
            <h2>WIND</h2>
          </div>
          <div className="temp">
            {data.main && data.main.temp && (
              <h2>{Math.round(data.main.temp)}°C</h2>
            )}
            <h2>TEMP</h2>
          </div>
          <div className="humidity">
            
          {data.main && data.main.humidity && (
              <h2>{Math.round(data.main.humidity)}%</h2>
            )}
            <h2>HUMIDITY</h2>
          </div>
        </div>
        <h1 className="createdBy">Created By Zauri Barbaqadze</h1>
      </div>
    </div>
  );
}

export default App;
