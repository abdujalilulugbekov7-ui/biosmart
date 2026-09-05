import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ message = 'BioSmart platformasi yuklanmoqda...' }) {
  return (
    <div className="biosmart-loading-page">
      {/* Ambient background glows */}
      <div className="biosmart-loading-bg">
        <div className="loading-bg__circle loading-bg__circle--1" />
        <div className="loading-bg__circle loading-bg__circle--2" />
        <div className="loading-bg__circle loading-bg__circle--3" />
      </div>

      <div className="biosmart-loading-container">
        {/* Animated Shield Logo with Rings */}
        <div className="loading-logo-wrapper">
          <div className="loading-glow-ring loading-glow-ring--outer" />
          <div className="loading-glow-ring loading-glow-ring--inner" />
          
          <div className="loading-shield-box">
            <svg viewBox="0 0 100 100" className="loading-shield-svg" width="76" height="76">
              <defs>
                <linearGradient id="load-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2ecc71" />
                  <stop offset="50%" stopColor="#27ae60" />
                  <stop offset="100%" stopColor="#1e8449" />
                </linearGradient>
                <linearGradient id="load-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#f1c40f" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <linearGradient id="load-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
              <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#load-shield-grad)" stroke="url(#load-gold-grad)" strokeWidth="3" />
              <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
              <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#load-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#load-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#load-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#load-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <circle cx="50" cy="50" r="5.5" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="loading-title">
          Bio<span className="loading-title--highlight">Smart</span>
        </h2>

        {/* Dynamic Message */}
        <p className="loading-status-text">
          {message}
        </p>

        {/* Modern Shimmer Progress Bar */}
        <div className="loading-progress-bar">
          <div className="loading-progress-fill" />
        </div>

        {/* Subtle pulsing dots */}
        <div className="loading-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}
