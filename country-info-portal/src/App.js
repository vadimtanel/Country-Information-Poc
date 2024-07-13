import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountriesOverview from './components/CountriesOverview';
import CountryDetails from './components/CountryDetails';

// Define the main App component with routing
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CountriesOverview />} />
        <Route path="/countries/:name" element={<CountryDetails />} />
      </Routes>
    </div>
  );
};

export default App;
