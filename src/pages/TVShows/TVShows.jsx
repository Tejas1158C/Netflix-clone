import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../Movies/Movies.css";

import { Link } from "react-router-dom";

const API_KEY = "a2ed92f612e79561d908205b2ecd941f";

const TVShows = () => {

  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setShows(data.results))
  }, [])

  return (
    <div className="page">
      <Navbar />
      <h1>TV Shows</h1>

      <div className="grid">
        {shows.map(show => (
          <Link to={`/player/${show.id}`} key={show.id}>
            <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
