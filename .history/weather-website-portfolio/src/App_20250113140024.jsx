import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherSearch from "./jsx/weatherSearch";
import WeatherDetails from "./jsx/weatherDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherSearch />} />
        <Route path="/details" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

