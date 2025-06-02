// COMPONENTS: Import React to use JSX and build components
import React from 'react';
// REACTDOM: Import ReactDOM to render React components to the real DOM
import ReactDOM from 'react-dom/client';
// REACT ROUTER: Import BrowserRouter to enable client-side routing
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Entry point: ReactDOM creates the virtual DOM and renders the app
// BrowserRouter enables client-side routing
function loadGoogleMapsScript(callback) {
  if (window.google && window.google.maps && window.google.maps.places) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w&libraries=places";
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}

loadGoogleMapsScript(() => {
  // VIRTUAL DOM: ReactDOM creates a virtual DOM tree and syncs it with the real DOM efficiently
const root = ReactDOM.createRoot(document.getElementById('root'));
  // REACTDOM: Render the root React component (<App />) inside <BrowserRouter> for SPA navigation
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
