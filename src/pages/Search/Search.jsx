import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Search.css";

const API_KEY = "418ff9ee423b1f27393a01410f05f82c";

const Search = () => {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // 🔍 SEARCH
  const searchMovies = async (text) => {

    setQuery(text);

    if (!text) {
      setMovies([]);
      return;
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}`
    );

    const data = await res.json();
    setMovies(data.results);
  };

  // ❌ CANCEL
  const cancelSearch = () => {
    setQuery("");
    setMovies([]);
  };

  return (
    <div className="search-page">

      {/* TOP BAR */}
      <div className="search-top">

        <button className="back-btn" onClick={()=>navigate("/")}>
          ← Back
        </button>

        <input
          autoFocus
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e)=>searchMovies(e.target.value)}
        />

        <button className="cancel-btn" onClick={cancelSearch}>
          Cancel
        </button>

      </div>

      {/* RESULTS */}
      <div className="search-results">
        {movies.map(movie=>(
          <Link to={`/player/${movie.id}`} key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt=""
            />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Search;
