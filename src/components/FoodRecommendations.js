import React, { useState, useEffect } from "react";
import "./FoodRecommendations.css";

function FoodRecommendations() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const fetchRecipes = async (searchTerm) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTerm}&number=8`
    );
    const data = await response.json();
    if (data.results) {
      setRecipes(data.results);
    } else {
      setRecipes([]);
    }
  };

  // Fetch default recipes when page loads
  useEffect(() => {
    fetchRecipes("pasta");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchRecipes(query);
    }
  };

  return (
    <div className="food-page">
      <h2>🍽️A recipe is a story that ends with a good meal</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipes-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))
        ) : (
          <p>No recipes found. Try something else!</p>
        )}
      </div>
    </div>
  );
}

export default FoodRecommendations;
