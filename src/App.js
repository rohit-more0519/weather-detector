import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';

// Spinner component
function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div style={{marginTop: '10px'}}>Fetching weather data...</div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Google Places Autocomplete integration
  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      fields: ['address_components', 'formatted_address'],
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setCity(place.formatted_address);
      } else if (place.address_components) {
        // fallback to city name if formatted_address is missing
        const cityComponent = place.address_components.find(c => c.types.includes('locality'));
        if (cityComponent) setCity(cityComponent.long_name);
      }
    });
  }, []);

  const fetchWeather = async (e) => {
    e?.preventDefault(); // Make e optional for programmatic calls
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      });
    } catch (err) {
      setError(err.message || 'Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(e);
    }
  };

  const handleCancel = () => {
    setCity('');
    setError('');
    setWeather(null);
    inputRef.current?.focus();
  };

  return (
    <div className="App">
      {/* Animated clouds for background */}
      <div className="cloud c1">
        <div className="cloud-part p1"></div>
        <div className="cloud-part p2"></div>
        <div className="cloud-part p3"></div>
        <div className="cloud-part p4"></div>
      </div>
      <div className="cloud c2">
        <div className="cloud-part p1"></div>
        <div className="cloud-part p2"></div>
        <div className="cloud-part p3"></div>
        <div className="cloud-part p4"></div>
      </div>
      <div className="cloud c3">
        <div className="cloud-part p1"></div>
        <div className="cloud-part p2"></div>
        <div className="cloud-part p3"></div>
        <div className="cloud-part p4"></div>
      </div>
      <div className="cloud c4">
        <div className="cloud-part p1"></div>
        <div className="cloud-part p2"></div>
        <div className="cloud-part p3"></div>
        <div className="cloud-part p4"></div>
      </div>
      <div className="cloud c5">
        <div className="cloud-part p1"></div>
        <div className="cloud-part p2"></div>
        <div className="cloud-part p3"></div>
        <div className="cloud-part p4"></div>
      </div>

      <h1 className="weather-title">Weather Detector</h1>
      <form className="weather-form" onSubmit={fetchWeather}>
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="weather-input"
            autoComplete="off"
            disabled={loading}
          />
          <div className="button-group">
            {(city || weather) && !loading && (
              <button 
                type="button" 
                className="weather-btn cancel-btn"
                onClick={handleCancel}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <button 
              type="submit" 
              className="weather-btn" 
              disabled={loading || !city.trim()}
            >
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </div>
        </div>
      </form>
      {loading && <Spinner />}
      {error && <div className="weather-error">{error}</div>}
      {weather && (
        <div className="weather-card animate-pop">
          <h2>{weather.city}, {weather.country}</h2>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.desc}
          />
          <div className="weather-temp">{Math.round(weather.temp)}°C</div>
          <div className="weather-desc">{weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}</div>
        </div>
      )}
    </div>
  );
}

export default App;
