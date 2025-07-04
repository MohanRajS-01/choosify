import React, { useState, useEffect } from "react";
import "./JobRecommendations.css";

const JOOBLE_API_KEY = process.env.REACT_APP_JOOBLE_API_KEY;

function JobRecommendations() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch default random jobs when component mounts
  useEffect(() => {
    fetchRandomJobs();
  }, []);

  const fetchRandomJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jooble.org/api/${JOOBLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: "Developer",  // You can change this default keyword
          location: "",
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  const searchJobs = async () => {
    if (!keywords.trim()) {
      alert("Enter job keywords!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://jooble.org/api/${JOOBLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: keywords.trim(),
          location: location.trim(),
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
        alert("No jobs found! Try different keywords/location.");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  return (
    <div className="jobs-page">
      <h2 classname="jobs-title">💼 Choose a job you love</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Job keywords (e.g., React Developer)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchJobs} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h4 style={{color: "#f5f5dc;"}}>{job.title}</h4>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="details-link"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobRecommendations;
