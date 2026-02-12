import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Category.css";

const API_KEY = "418ff9ee423b1f27393a01410f05f82c";

const Category = () => {

  const { type } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [type]);

  return (
    <div className="category-page">
      <h1>{type.toUpperCase()}</h1>

      <div className="category-grid">
        {movies.map(movie => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
