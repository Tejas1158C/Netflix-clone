import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { getProfile, addToMyList } from "../../firebase";

const TitleCards = ({ title, category, onCardClick }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmVkOTJmNjEyZTc5NTYxZDkwODIwNWlyZWNkOTQxZilsIm5iZiI6MTc3MDMwNDg0OC4yMDMsInN1Yil6IjY5ODRiNTUwNWJiYzc4MzA4ZTkxMzA5YilsInNjb3Blcyl6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uljoxfQ.F8WFsqkSoNEwH2U3UvsR5It1YipQC0SazPP61upWdT4"
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then(res => res.json())
      .then(res => {
        if (res.results) setApiData(res.results);
      })
      .catch(err => console.log(err));
  }, [category]);

  const handleWheel = (e) => {
    e.preventDefault();
    if (cardsRef.current)
      cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const ref = cardsRef.current;
    if (!ref) return;

    ref.addEventListener("wheel", handleWheel, { passive: false });
    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);

  const handleAdd = async (card) => {
    const user = await getProfile();
    if (!user) return alert("Login first");

    const movieData = {
      id: card.id,
      title: card.original_title,
      poster: card.backdrop_path
    };

    await addToMyList(user.id, movieData);
    alert("Added to My List");
  };

  return (
    <div className="title-cards">
      <h2>{title || "Popular"}</h2>

      <div className="cards-list" ref={cardsRef}>
        {apiData?.map((card, index) => (
          <div
            className="card"
            key={index}
            onClick={() => onCardClick ? onCardClick(card) : null}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title}
            />

            <div className="card-info">
              <p>{card.original_title}</p>

              <button
                className="mylist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(card);
                }}
              >
                + My List
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
