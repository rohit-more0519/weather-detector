import React from 'react';

// WeatherDisplay uses props and conditional rendering
function WeatherDisplay({ weather }) {
  if (!weather) return null;
  return (
    <div className="weather-card-modern">
      <div className="weather-card-header">
        <h2>{weather.city}{weather.country ? `, ${weather.country}` : ''}</h2>
      </div>
      <div className="weather-card-body">
        {weather.icon && (
          <img
            className="weather-main-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.desc}
          />
        )}
        <div className="weather-main-temp">{weather.temp !== undefined ? `${Math.round(weather.temp)}°C` : '--'}</div>
        <div className="weather-main-desc">{weather.desc ? weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1) : ''}</div>
        <div className="weather-details">
          {weather.humidity !== undefined && weather.humidity !== null && weather.humidity !== '' && (
            <div><strong>Humidity:</strong> {weather.humidity}%</div>
          )}
          {weather.wind !== undefined && weather.wind !== null && weather.wind !== '' && (
            <div><strong>Wind Speed:</strong> {weather.wind} m/s</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
