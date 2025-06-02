import React from 'react';

// About page for React Router demonstration
function About() {
  return (
    <div className="about-page">
      <h2>About This App</h2>
      <p>This app demonstrates key React concepts: components, JSX, props, state, hooks, lifecycle methods, conditional rendering, React Router, and ReactDOM.</p>
      <ul>
        <li>Built with functional components and hooks</li>
        <li>Uses OpenWeatherMap API</li>
        <li>Features Google Places Autocomplete</li>
        <li>Showcases modern React best practices</li>
      </ul>
    </div>
  );
}

export default About;
