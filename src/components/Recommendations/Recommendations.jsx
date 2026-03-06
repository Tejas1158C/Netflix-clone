import React, { useEffect, useState } from 'react';
import './Recommendations.css';

const API_KEY = "418ff9ee423b1f27393a01410f05f82c";

const Recommendations = ({ movieId, type = "movie", onCardClick }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (!movieId) return;

        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/${type}/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await res.json();
                if (data.results) {
                    setRecommendations(data.results.slice(0, 6)); // Show top 6
                }
            } catch (err) {
                console.error("Error fetching recommendations:", err);
            }
        };

        fetchRecommendations();
    }, [movieId, type]);

    if (recommendations.length === 0) return null;

    return (
        <div className="recommendations-row">
            <h3>More Like This</h3>
            <div className="recommendations-grid">
                {recommendations.map((item) => (
                    <div
                        key={item.id}
                        className="rec-card"
                        onClick={() => onCardClick(item)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${item.backdrop_path || item.poster_path}`}
                            alt={item.title || item.name}
                        />
                        <div className="rec-card-info">
                            <span className="rec-title">{item.title || item.name}</span>
                            <div className="rec-meta">
                                <span className="rec-year">{new Date(item.release_date || item.first_air_date).getFullYear()}</span>
                                <span className="rec-rating">⭐ {item.vote_average?.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
