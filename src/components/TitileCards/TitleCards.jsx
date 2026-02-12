import React, { useRef, useEffect } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title,category }) => {

  const[apiData,setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MThmZjllZTQyM2IxZjI3MzkzYTAxNDEwZjA1ZjgyYyIsIm5iZiI6MTc3MDMwNDg0OC4yMDMsInN1YiI6IjY5ODRiNTUwNWJiYzc4MzA4ZTkxMzA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbcNYKKMPQUEf-QyO4KVDqpK2o1atulPdQHVfvh5T38'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => {
    setApiData(res.results);
  })
  .catch(err => console.error(err));

    const currentRef = cardsRef.current;

    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>

      <div className="cards-list" ref={cardsRef}>
        {apiData.map((card, index) => {
           return (
            <Link to={`/player/${card.id}`} key={index}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                <p>{card.original_title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
