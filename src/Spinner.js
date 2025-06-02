import React from 'react';

// Spinner component for loading state
function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div style={{marginTop: '10px'}}>Fetching weather data...</div>
    </div>
  );
}

export default Spinner;
