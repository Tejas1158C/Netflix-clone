import React, { useEffect, useState, useRef } from 'react';
import './TrendingNow.css';

const TrendingNow = ({ onCardClick }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    // TMDB API Key from environment or hardcoded mapping from previous context knowledge
    const API_KEY = "8dda9998-4dd5-49c1-81af-5442e66c2441"; // Placeholder if not found, but I will use the standard TMDB URL structure used in this project

    // Previous logs show TitleCards uses options with a bearer token
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmVkOTJmNjEyZTc5NTYxZDkwODIwNWlyZWNkOTQxZilsIm5iZiI6MTc3MDMwNDg0OC4yMDMsInN1Yil6IjY5ODRiNTUwNWJiYzc4MzA4ZTkxMzA5YilsInNjb3Blcyl6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uljoxfQ.F8WFsqkSoNEwH2U3UvsR5It1YipQC0SazPP61upWdT4'
        }
    };

    const fetchTrending = () => {
        // Fetching popular movies as trending
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => setApiData(res.results.slice(0, 10)))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchTrending();
    }, [])

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    return (
        <div className='trending-now'>
            <h2>Trending Now</h2>
            <div className="trending-slider" ref={cardsRef} onWheel={handleWheel}>
                {apiData.map((movie, index) => {
                    return (
                        <div className="trending-card" key={index} onClick={() => onCardClick(movie)}>
                            <div className="rank-number">{index + 1}</div>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TrendingNow;
