import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recommendations from '../Recommendations/Recommendations';
import './InfoModal.css';

const API_KEY = "418ff9ee423b1f27393a01410f05f82c";

const InfoModal = ({ movie, onClose }) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState([]);
    const [currentMovie, setCurrentMovie] = useState(movie);

    useEffect(() => {
        if (movie) setCurrentMovie(movie);
    }, [movie]);

    useEffect(() => {
        if (!currentMovie) return;

        const fetchDetails = async () => {
            try {
                // Try fetching as movie first
                let detailRes = await fetch(`https://api.themoviedb.org/3/movie/${currentMovie.id}?api_key=${API_KEY}`);
                let detailData = await detailRes.json();

                let creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${currentMovie.id}/credits?api_key=${API_KEY}`);
                let creditsData = await creditsRes.json();

                if (!detailData.title) {
                    // Try as TV series
                    detailRes = await fetch(`https://api.themoviedb.org/3/tv/${currentMovie.id}?api_key=${API_KEY}`);
                    detailData = await detailRes.json();

                    creditsRes = await fetch(`https://api.themoviedb.org/3/tv/${currentMovie.id}/credits?api_key=${API_KEY}`);
                    creditsData = await creditsRes.json();
                }

                setDetails(detailData);
                if (creditsData.cast) {
                    setCast(creditsData.cast.slice(0, 5));
                }
            } catch (err) {
                console.error("Error fetching modal details:", err);
            }
        };

        fetchDetails();
    }, [currentMovie]);

    if (!currentMovie) return null;

    const bannerUrl = details && details.backdrop_path
        ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
        : (currentMovie.backdrop_path || currentMovie.poster_path)
            ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || currentMovie.poster_path}`
            : "";

    const title = currentMovie.title || currentMovie.name || (details && (details.title || details.name));
    const isTV = !!(currentMovie.first_air_date || (details && details.first_air_date));

    return (
        <div className="info-modal-overlay" onClick={onClose}>
            <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-banner" style={{ backgroundImage: `url(${bannerUrl})` }}>
                    <div className="banner-fade"></div>
                    <div className="modal-title-area">
                        <h1>{title}</h1>
                    </div>
                </div>

                <div className="modal-info-body">
                    <div className="modal-flex-container">
                        <div className="modal-left">
                            <div className="meta-info">
                                <span className="match-score">98% Match</span>
                                <span className="year">{(currentMovie.release_date || currentMovie.first_air_date || (details && (details.release_date || details.first_air_date))) ? new Date(currentMovie.release_date || currentMovie.first_air_date || (details && (details.release_date || details.first_air_date))).getFullYear() : "-"}</span>
                                <span className="age-rating">A</span>

                                {details && details.id && (
                                    <span className="duration">
                                        {isTV ?
                                            `${details.number_of_seasons || 1} ${details.number_of_seasons > 1 ? 'Seasons' : 'Season'}` :
                                            details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : "-"
                                        }
                                    </span>
                                )}

                                <span className="quality-badge">HD</span>
                            </div>

                            <p className="description">
                                {currentMovie.overview || (details && details.overview) || "No description available for this title."}
                            </p>
                        </div>

                        <div className="modal-right">
                            {cast.length > 0 && (
                                <div className="cast-info">
                                    <span className="label">Cast: </span>
                                    {cast.map((c, i) => (
                                        <span key={c.id} className="value">
                                            {c.name}{i < cast.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {details && details.genres && (
                                <div className="genre-info">
                                    <span className="label">Genres: </span>
                                    {details.genres.map((g, i) => (
                                        <span key={g.id} className="value">
                                            {g.name}{i < details.genres.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {details && (
                                <div className="rating-info">
                                    <span className="label">Rating: </span>
                                    <span className="value">⭐ {details.vote_average?.toFixed(1)}/10</span>
                                </div>
                            )}

                            {isTV && details && (
                                <div className="episode-info">
                                    <span className="label">Episodes: </span>
                                    <span className="value">{details.number_of_episodes} Total</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button className="get-started-btn" onClick={() => navigate(`/player/${currentMovie.id || '8dda9998'}`)}>
                            Get Started &gt;
                        </button>
                    </div>

                    <Recommendations
                        movieId={currentMovie.id}
                        type={isTV ? "tv" : "movie"}
                        onCardClick={(item) => setCurrentMovie(item)}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
