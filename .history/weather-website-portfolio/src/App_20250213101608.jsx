import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherSearch from "./jsx/weatherSearch";
import WeatherDetails from "./jsx/weatherDetails";
import Format from "./jsx/format";


function Home() {
  return (
    <>
      <Format />
      <WeatherSearch />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


export default App;

