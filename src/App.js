import React, { useState } from "react";
import { useEffect } from "react";
 
function App() {
  const [city, setCity] = useState("Rajasthan");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
 
  const currentDate = new Date();
 
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
 
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
 
  const formattedDate = `${month} ${day}, ${year}`;
 
  const API_KEY = "bcda10ba323e88e96cb486015a104d1d"; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
 
  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError("City name cannot be empty.");
      setWeatherData(null);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
  
      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else if (response.status === 404) {
        setError("City not found. Please check the spelling or try another city.");
        setWeatherData(null);
      } else {
        setError(data.message || "Failed to fetch weather data.");
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };
  
  useEffect(()=>{
 
     
   
 
  fetchWeatherData();
 
  },[])
 
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
 
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"; // Path to your sunny weather icon
      case "Rain":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToR0qxd-HWAbf7M0TtcVhR5Co-ElND9Jh1Og&s"; // Path to your rainy weather icon
      case "Snow":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsigKTYxd9VbAuGi352d3Z5BbEETV9ApTxg&s"; // Path to your snowy weather icon
      case "Haze":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaKn4fOMZafqdtJ69u0PS6vu3NWnPNOIUTw&s"; // Path to your haze weather icon
      // Add more cases for other weather conditions as needed
      case "Mist":
        return "https://cdn-icons-png.flaticon.com/512/10630/10630000.png";
      case "Drizzle":
        return "https://cdn3d.iconscout.com/3d/premium/thumb/rainy-day-3d-icon-download-in-png-blend-fbx-gltf-file-formats--rain-cloud-sun-weather-pack-icons-5753017.png";
      case "clouds":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcShr-cwfKDR0THwvbWSEl01rhRzZNKQuLA&s";
      default:
        return null;
    }
  };
 
 
  return (
    <div className="App">
       
 
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              {/* <img className="container_img" src="/thunder.png" width="180px" alt="sss"/> */}
              <img className="container_img" src={getWeatherIconUrl(weatherData.weather[0].main)} width="180px" alt="Weather Icon" />
              <h2 className="container_degree">{weatherData.main.temp}</h2>
              <h2 className="country_per">{weatherData.weather[0].main}<span className="degree_icon"></span></h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  class="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
 
 
      </div>
    </div>
  );
}
 
export default App;