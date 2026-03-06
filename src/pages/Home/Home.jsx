import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitileCards/TitleCards'
import TrendingNow from '../../components/TrendingNow/TrendingNow'
import InfoModal from '../../components/InfoModal/InfoModal'
import FAQ from '../../components/FAQ/FAQ'
import ReasonsToJoin from '../../components/ReasonsToJoin/ReasonsToJoin'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>Discovering his ties to a secret ancient order, a young man living in the modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
            <button className='btn' onClick={() => navigate('/player/8961')}><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn' onClick={() => openModal({
              id: 82813,
              title: "The Protector",
              backdrop_path: "/lh9bQ8vB9Y9FwW1t8V8X9I8V.jpg", // Verified TMDB path segment
              overview: "Discovering his ties to a secret ancient order, a young man living in the modern Istanbul embarks on a quest to save the city from an immortal enemy.",
              first_air_date: "2018-12-14"
            })}><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards onCardClick={openModal} />
        </div>
      </div>

      <div className="more-cards">
        <TrendingNow onCardClick={openModal} />
        <TitleCards title={"Personalized for You"} category={"top_rated"} onCardClick={openModal} />
        <TitleCards title={"Blockbuster Movies"} category={"popular"} onCardClick={openModal} />
        <TitleCards title={"Only on Netflix"} category={"upcoming"} onCardClick={openModal} />
        <TitleCards title={"Upcoming Movies"} category={"now_playing"} onCardClick={openModal} />
      </div>

      <ReasonsToJoin />
      <FAQ />
      <Footer />

      {selectedMovie && (
        <InfoModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}

export default Home