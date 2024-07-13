import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a root using the new createRoot method
const root = createRoot(rootElement);

// Render the App component wrapped with Router for routing support
root.render(
  <Router>
    <App />
  </Router>
);
