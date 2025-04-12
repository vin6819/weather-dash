import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await axios.get(`https://weather-dash-x1ak.onrender.com/weather?city=${city}`);
      // const res = await axios.get(`http://localhost:3000/weather?city=${city}`);
      // console.log(res.data);
      setWeather(res.data);
    } catch (err) {
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Network error or server unavailable');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-10%' }}>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default App;
