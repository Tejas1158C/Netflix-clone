import React, { useEffect, useState, useRef } from 'react';
import './TrendingNow.css';

const TrendingNow = ({ onCardClick }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const fetchTrending = () => {
        // Fetching popular movies as trending
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                if (res.results) {
                    setApiData(res.results.slice(0, 10));
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchTrending();
    }, [])

    const handleWheel = (event) => {
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
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
