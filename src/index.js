import React from 'react';
import ReactDOM from 'react-dom/client';
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
  const root = ReactDOM.createRoot(document.getElementById('root'));
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
