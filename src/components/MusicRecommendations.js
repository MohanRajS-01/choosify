import React, { useState, useEffect } from "react";
import "./MusicRecommendations.css";

function MusicRecommendations() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

  // Fetch by search term or language
  const fetchTracks = async (searchTerm) => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=${API_KEY}&format=json&limit=12`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      setTracks(data.results.trackmatches.track);
    } else {
      setTracks([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchTracks(query);
    }
  };

  return (
    <div className="music-page">
      <h2>🎵 Music is the strongest form of magic.</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a song or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3 className="highlighted">✨ Choose Language ✨</h3>
      <div className="languages-list">
        {["Tamil", "English", "Telugu", "Kannada", "Malayalam", "Hindi"].map(
          (lang) => (
            <button
              key={lang}
              className="language-card"
              onClick={() => fetchTracks(lang)}
            >
              {lang}
            </button>
          )
        )}
      </div>

      <div className="tracks-list">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <div key={index} className="track-card">
              <img
                src={
                  track.image && track.image[2] && track.image[2]["#text"]
                    ? track.image[2]["#text"]
                    : "https://via.placeholder.com/150"
                }
                alt={track.name}
              />
              <h3>{track.name}</h3>
              <p>{track.artist ? track.artist : ""}</p>
            </div>
          ))
        ) : (
          <p className="no-tracks">
            Try searching for a song or choose a language!
          </p>
        )}
      </div>
    </div>
  );
}

export default MusicRecommendations;
