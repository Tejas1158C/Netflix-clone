import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Movies.css";
import { Link } from "react-router-dom";

const API_KEY = "a2ed92f612e79561d908205b2ecd941f";

const Movies = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }, [])

  return (
    <div className="page">
      <Navbar />
      <h1>Movies</h1>

      <div className="grid">
        {movies.map(movie => (
          <Link to={`/player/${movie.id}`} key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
