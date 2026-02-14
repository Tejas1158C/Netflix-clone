import React from "react";
import { Link } from "react-router-dom";
import { getProfile, addToMyList, removeFromMyList } from "../../firebase";
import "./MovieCard.css";

const MovieCard = ({ movie, showRemove }) => {

  const addMovie = async () => {
    const user = await getProfile();
    if (!user) return alert("Login first");

    const data = {
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.backdrop_path || movie.poster
    };

    await addToMyList(user.id, data);
    alert("Added to My List");
  };

  const removeMovie = async () => {
    const user = await getProfile();
    if (!user) return;

    await removeFromMyList(user.id, movie);
    window.location.reload();
  };

  return (
    <div className="movie-card">

      <Link to={`/player/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster}`}
        />
      </Link>

      <div className="movie-overlay">

        {!showRemove ? (
          <button onClick={addMovie}>+ My List</button>
        ) : (
          <button onClick={removeMovie}>Remove</button>
        )}

      </div>

    </div>
  );
};

export default MovieCard;
