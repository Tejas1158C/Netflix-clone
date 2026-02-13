import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // scroll dark navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      
      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />

        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/tv")}>TV Shows</li>
          <li onClick={() => navigate("/movies")}>Movies</li>
          <li onClick={() => navigate("/new")}>New & Popular</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        
        {/* SEARCH */}
        <img
          src={search_icon}
          className="icon"
          onClick={() => navigate("/search")}
        />

        {/* 🔔 NOTIFICATION */}
        <div className="notif-wrapper">
          <img
            src={bell_icon}
            className="icon"
            onClick={() => setShowNotif(!showNotif)}
          />

          {showNotif && (
            <div className="notif-box">
              <p>🎬 New movie released</p>
              <p>🔥 Trending now</p>
              <p>⭐ Recommended for you</p>
              <p>👀 Continue watching</p>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          className="navbar-profile"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img src={profile_img} className="profile" alt="" />
          <img src={caret_icon} alt="" />

          {showProfile && (
            <div className="dropdown">
              <p onClick={() => navigate("/profiles")}>Profiles</p>
              <p onClick={logout}>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
