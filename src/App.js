import React from "react";
import { HashRouter as HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MovieRecommendations from "./components/MovieRecommendations";
import FoodRecommendations from "./components/FoodRecommendations";
import MusicRecommendations from "./components/MusicRecommendations";
import ProductRecommendations from "./components/ProductRecommendations";
import JobRecommendations from "./components/JobRecommendations";

function App() {
  return (
    <HashRouter>
      <div>
        <nav style={{ padding: "1rem", background: "#161512FF" }}>
          <Link to="/" style={{ marginRight: "10px", fontSize: "35px", color: "#fdfdfd" }}>Choosify</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieRecommendations />} />
          <Route path="/food" element={<FoodRecommendations />} />
          <Route path="/music" element={<MusicRecommendations />} />
          <Route path="/products" element={<ProductRecommendations />} />  
          <Route path="/jobs" element={<JobRecommendations />} />       
          {/* Add more routes for other categories */}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
