import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './routes/home.jsx';
import CountryList from './routes/list.jsx';
import PopulationChart from './routes/population.jsx';
import GDPChart from './routes/gdp.jsx';

import './App.css';

const mainContentStyle = {
  paddingTop: '70px',
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<CountryList />} />
        <Route path="/population" element={<PopulationChart />} />
        <Route path="/gdp" element={<GDPChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
