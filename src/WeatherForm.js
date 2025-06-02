import React from 'react';

// WeatherForm uses props and JSX
function WeatherForm({ city, setCity, fetchWeather, inputRef }) {
  return (
    <form onSubmit={fetchWeather} className="weather-form new-form-layout">
      <div className="input-btn-group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
          autoFocus
          
        />
      </div>
      <button type="submit" className="get-weather-btn">Get Weather</button>
      {city && (
        <button
          type="button"
          className="clear-btn"
          aria-label="Clear search"
          onClick={() => setCity('')}
        >
          Clear
        </button>
      )}

    </form>
  );
}

export default WeatherForm;
