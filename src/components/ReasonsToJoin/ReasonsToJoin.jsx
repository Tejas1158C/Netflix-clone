import React from 'react';
import './ReasonsToJoin.css';

const reasonsData = [
    {
        title: "Enjoy on your TV",
        desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
        icon: (
            <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="tvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4a154b" />
                        <stop offset="100%" stopColor="#cf1a2c" />
                    </linearGradient>
                </defs>
                <rect x="10" y="20" width="80" height="50" rx="4" fill="#333" stroke="#555" strokeWidth="2" />
                <rect x="14" y="24" width="72" height="42" fill="url(#tvGrad)" />
                <path d="M 45 70 L 45 80 L 35 80 L 35 84 L 65 84 L 65 80 L 55 80 L 55 70 Z" fill="#cf1a2c" />
            </svg>
        )
    },
    {
        title: "Download your shows to watch offline",
        desc: "Save your favourites easily and always have something to watch.",
        icon: (
            <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="dlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffb3c6" />
                        <stop offset="100%" stopColor="#c110a2" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#dlGrad)" opacity="0.9" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                <path d="M 50 30 L 50 65 M 35 50 L 50 65 L 65 50" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        )
    },
    {
        title: "Watch everywhere",
        desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
        icon: (
            <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c110a2" />
                        <stop offset="100%" stopColor="#cf1a2c" />
                    </linearGradient>
                </defs>
                <path d="M 30 70 L 70 30 L 80 40 L 40 80 Z" fill="url(#scopeGrad)" />
                <ellipse cx="75" cy="35" rx="10" ry="15" transform="rotate(45 75 35)" fill="#ffb3c6" />
                <ellipse cx="35" cy="75" rx="6" ry="10" transform="rotate(45 35 75)" fill="#660033" />
                <path d="M 25 85 L 30 80 L 35 85 L 30 90 Z" fill="#cf1a2c" />
                <path d="M 15 25 L 20 15 L 25 25 L 35 30 L 25 35 L 20 45 L 15 35 L 5 30 Z" fill="#cf1a2c" opacity="0.8" />
                <circle cx="80" cy="75" r="3" fill="#cf1a2c" />
                <circle cx="85" cy="15" r="4" fill="#cf1a2c" />
            </svg>
        )
    },
    {
        title: "Create profiles for kids",
        desc: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
        icon: (
            <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="face1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#ffb3c6" />
                    </linearGradient>
                    <linearGradient id="face2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff0000" />
                        <stop offset="100%" stopColor="#660066" />
                    </linearGradient>
                </defs>
                <rect x="25" y="25" width="40" height="40" rx="8" fill="url(#face1Grad)" />
                <circle cx="35" cy="35" r="3" fill="#000" />
                <circle cx="55" cy="35" r="3" fill="#000" />
                <path d="M 40 45 Q 45 50 50 45" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="45" y="45" width="45" height="45" rx="8" fill="url(#face2Grad)" stroke="#111" strokeWidth="2" />
                <circle cx="55" cy="60" r="3" fill="#fff" />
                <circle cx="75" cy="60" r="3" fill="#fff" />
                <path d="M 60 75 Q 65 82 70 75" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
        )
    }
];

const ReasonsToJoin = () => {
    return (
        <div className="reasons-container">
            <h2 className="reasons-title">More reasons to join</h2>
            <div className="reasons-grid">
                {reasonsData.map((item, index) => (
                    <div className="reason-card" key={index}>
                        <div className="reason-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                        <div className="reason-icon">
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReasonsToJoin;
