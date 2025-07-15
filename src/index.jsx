import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';

// Set --vh custom property for mobile viewport height
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh();
let prevWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth !== prevWidth) {
    prevWidth = window.innerWidth;
    setVh();
  }
});

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
