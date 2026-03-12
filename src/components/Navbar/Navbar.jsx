import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout, getProfile } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import { initialNotifications } from "../../data/notificationData";

const Navbar = () => {
  const navRef = useRef();
  const notifRef = useRef();
  const profileRef = useRef();
  const navigate = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  // dark navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add("nav-dark");
        } else {
          navRef.current.classList.remove("nav-dark");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close dropdown if click outside
  useEffect(() => {
    const close = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) setShowNotif(false);

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) setShowProfile(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="" onClick={() => navigate("/")} />

        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/tv")}>TV Shows</li>
          <li onClick={() => navigate("/movies")}>Movies</li>
          <li onClick={() => navigate("/new")}>New & Popular</li>
          <li onClick={() => navigate("/mylist")}>My List</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <img
          src={search_icon}
          className="icon"
          onClick={() => navigate("/search")}
        />

        {/* 🔔 NOTIFICATION */}
        <div className="notif-wrapper" ref={notifRef}>
          <div className="bell-click" onClick={() => setShowNotif(!showNotif)}>
            <img src={bell_icon} className="icon" />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </div>

          {showNotif && (
            <Notifications
              notifications={notifications}
              onMarkRead={handleMarkRead}
              onMarkAllRead={handleMarkAllRead}
            />
          )}
        </div>

        {/* PROFILE */}
        <div className="navbar-profile" ref={profileRef}>
          <div
            className="profile-click"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src={user?.avatar || profile_img}
              className="profile"
              alt=""
            />
            <img src={caret_icon} />
          </div>

          {showProfile && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </div>

              <div
                className="dropdown-item logout"
                onClick={logout}
              >
                🚪 Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
