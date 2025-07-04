import React, { useState, useEffect } from "react";
import "./MovieRecommendations.css";

function MovieRecommendations() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const fetchMovies = async (searchTerm) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  // Fetch default movies on first load
  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchMovies(query);
    }
  };

  return (
    <div className="movies-page">
      <h2>🎬A single frame can hold a thousand emotions.</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default MovieRecommendations;
