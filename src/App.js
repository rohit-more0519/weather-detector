// COMPONENTS: Importing React and hooks to build functional components
import React, { useState, useRef, useEffect } from 'react';
// REACT ROUTER: Importing routing components for SPA navigation
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
// COMPONENT: Main App function component
function App() {
    // STATE: Local state for loading indicator
  const [loading, setLoading] = useState(false);
    // STATE: City input value
  const [city, setCity] = useState('');
    // STATE: Weather data object
  const [weather, setWeather] = useState(null);
    // STATE: Error message
  const [error, setError] = useState('');
    // HOOK: useRef for direct DOM manipulation (input focus)
  const inputRef = useRef(null);

  // Google Places Autocomplete integration
    // LIFECYCLE: useEffect runs after component mounts (like componentDidMount)
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
      // JSX: UI structure using HTML-like syntax
  <div className="App">
      {/* Header and navigation (demonstrates JSX, components, React Router) */}
            {/* COMPONENT: Header for app title and navigation */}
      <Header />

      {/* Animated clouds for background (JSX demonstration) */}
      {[1,2,3,4,5].map(n => (
        <div className={`cloud c${n}`} key={n}>
          {[1,2,3,4].map(p => <div className={`cloud-part p${p}`} key={p}></div>)}
        </div>
      ))}

      {/* React Router for page navigation */}
            {/* REACT ROUTER: Define client-side routes for SPA navigation */}
      <Routes>
        <Route path="/" element={
          <main>
            {/* WeatherForm demonstrates props, state, and controlled components */}
                        {/* PROPS: Passing data and callbacks from App to WeatherForm */}
            <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather} inputRef={inputRef} />
            {/* Conditional rendering for loading, error, and weather */}
                        {/* CONDITIONAL RENDERING: Show spinner when loading */}
            {loading && <Spinner />}
                        {/* CONDITIONAL RENDERING: Show error message if error exists */}
            {error && <div className="weather-error">{error}</div>}
                        {/* COMPONENT: WeatherDisplay shows weather info if available */}
            <WeatherDisplay weather={weather} />
          </main>
        } />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Footer component */}
            {/* COMPONENT: Footer for copyright info */}
      <Footer />
    </div>
  );
}

// EXPORT: Make App available to other files
export default App;
