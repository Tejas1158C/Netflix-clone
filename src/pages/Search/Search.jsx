import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Search.css";

const API_KEY = "a2ed92f612e79561d908205b2ecd941f";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [history, setHistory] = useState([]);

  // Filter states
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" }
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("netflix_search_history")) || [];
    setHistory(savedHistory);
    fetchMovies();
  }, [genre, year, language, sortBy]);

  const fetchMovies = async (text = query) => {
    let url = "";

    if (text) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}`;
      if (year) url += `&primary_release_year=${year}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&language=${language}`;
      if (genre) url += `&with_genres=${genre}`;
      if (year) url += `&primary_release_year=${year}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results) {
        setMovies(data.results);
        if (!text && !genre && !year) setPopularMovies(data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(query);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    let newHistory = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    newHistory = [query, ...newHistory].slice(0, 8);
    setHistory(newHistory);
    localStorage.setItem("netflix_search_history", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("netflix_search_history");
  };

  const cancelSearch = () => {
    setQuery("");
    setMovies(popularMovies);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language || "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  return (
    <div className="search-page">
      <div className="search-top">
        <button className="search-back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            autoFocus
            type="text"
            placeholder={isListening ? "Listening..." : "Search movies..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            onClick={startVoiceSearch}
          >
            🎤
          </button>
        </form>

        <button className="cancel-btn" onClick={cancelSearch}>
          Cancel
        </button>

        <button
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
      </div>

      <div className={`filters-bar ${showFilters ? 'show' : ''}`}>
        <div className="filter-group">
          <label>Genre</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="filter-group">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Latest</option>
            <option value="vote_average.desc">Rating</option>
          </select>
        </div>

        <button className="reset-filters" onClick={() => {
          setGenre("");
          setYear("");
          setLanguage("en-US");
          setSortBy("popularity.desc");
          setQuery("");
        }}>Reset</button>
      </div>

      {!query && history.length > 0 && (
        <div className="search-history-container">
          <div className="history-header">
            <h3>Recent Searches</h3>
            <button className="clear-history-btn" onClick={clearHistory}>Clear</button>
          </div>
          <div className="history-tags">
            {history.map((term, index) => (
              <span
                key={index}
                className="history-pill"
                onClick={() => setQuery(term)}
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="search-results">
        {movies.map(movie => (
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
