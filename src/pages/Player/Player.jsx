import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    // try movie first
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setVideoKey(data.results[0].key);
        }
        else {
          // try tv
          fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data2 => {
              if (data2.results && data2.results.length > 0) {
                setVideoKey(data2.results[0].key);
              }
            });
        }
      });
  }, [id]);

  const [aiSubtitles, setAiSubtitles] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");

  const captions = [
    "Analyzing audio track...",
    "Extracting dialogue...",
    "Translating to English (AI)...",
    "Synchronizing with video...",
    "Hello, who is there?",
    "I've been waiting for you.",
    "The journey has just begun.",
    "Be careful of what you find."
  ];

  const toggleAI = () => {
    if (!aiSubtitles) {
      setGenerating(true);
      setAiSubtitles(true);
      let i = 0;
      const interval = setInterval(() => {
        setCurrentCaption(captions[i]);
        i++;
        if (i === 4) setGenerating(false);
        if (i >= captions.length) {
          clearInterval(interval);
          setAiSubtitles(false);
        }
      }, 2000);
    } else {
      setAiSubtitles(false);
      setGenerating(false);
    }
  };

  return (
    <div className='player'>
      <div className="player-controls">
        <img className="back-btn" src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
        <button
          className={`ai-sub-btn ${aiSubtitles ? 'active' : ''}`}
          onClick={toggleAI}
        >
          {generating ? "🤖 AI Generating..." : "💬 AI Subtitles"}
        </button>
      </div>

      {videoKey && (
        <iframe
          width="90%"
          height="80%"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        />
      )}

      {aiSubtitles && (
        <div className={`subtitle-overlay ${generating ? 'generating' : ''}`}>
          {currentCaption}
        </div>
      )}
    </div>
  );
};

export default Player;
