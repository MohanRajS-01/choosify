import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      emoji: "🎬",
      title: "Movies",
      description: "Discover trending movies curated just for you.",
      path: "/movies",
    },
    {
      emoji: "🍽️",
      title: "Food",
      description: "Find delicious recipes and meal ideas to try today.",
      path: "/food",
    },
    {
      emoji: "🎵",
      title: "Music",
      description: "Explore new music and top hits personalized for you.",
      path: "/music",
    },
    {
      emoji: "🛍️",
      title: "Products",
      description: "Get smart exciting product for your needs.",
      path: "/products",
    },
    {
      emoji: "💼",
      title: "Jobs",
      description: "Search for jobs and career opportunities easily.",
      path: "/jobs",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">✨ Multi-Platform Hub ✨</h1>
      <p className="home-subtitle">
        Get smart recommendations for movies, food, music, products, and jobs!
      </p>

      <div className="cards-container">
        {categories.map((cat, idx) => (
          <div className="category-card" key={idx}>
            <div className="card-content">
              <div className="card-emoji">{cat.emoji}</div>
              <h3 className="card-title">{cat.title}</h3>
              <p className="card-description">{cat.description}</p>
            </div>
            <button
              className="card-button"
              onClick={() => navigate(cat.path)}
            >
              Explore {cat.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
