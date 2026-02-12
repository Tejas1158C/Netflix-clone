import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const API_KEY = "418ff9ee423b1f27393a01410f05f82c";

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

  return (
    <div className='player'>

      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />

      {videoKey && (
        <iframe
          width="90%"
          height="80%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        />
      )}

    </div>
  );
};

export default Player;
