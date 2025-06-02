import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Spinner from './Spinner';
import Footer from './Footer';
import About from './About';

// API key for weather fetching
const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';

// App component demonstrates state, hooks, lifecycle, props, conditional rendering, and routing
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
      {/* Header and navigation (demonstrates JSX, components, React Router) */}
      <Header />

      {/* Animated clouds for background (JSX demonstration) */}
      {[1,2,3,4,5].map(n => (
        <div className={`cloud c${n}`} key={n}>
          {[1,2,3,4].map(p => <div className={`cloud-part p${p}`} key={p}></div>)}
        </div>
      ))}

      {/* React Router for page navigation */}
      <Routes>
        <Route path="/" element={
          <main>
            {/* WeatherForm demonstrates props, state, and controlled components */}
            <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather} inputRef={inputRef} />
            {/* Conditional rendering for loading, error, and weather */}
            {loading && <Spinner />}
            {error && <div className="weather-error">{error}</div>}
            <WeatherDisplay weather={weather} />
          </main>
        } />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
