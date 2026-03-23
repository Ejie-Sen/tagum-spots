import React from 'react';

function Hero() {
  const scrollToMood = () => {
    document.getElementById('mood').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <video autoPlay muted loop playsInline className="hero-video">
        <source src="/Hero.mp4" type="video/mp4" />
      </video>
      <nav className="nav">
        <span className="nav-logo">Group 4 × Tagum</span>
        <span className="nav-badge">📍 Tagum City, Davao del Norte</span>
      </nav>

      <div className="hero-center">
        <p className="hero-eyebrow">☕ Your Tagum Coffee Concierge</p>
        <h1 className="hero-title">Find Your<br/><em>Perfect Spot</em></h1>
        <p className="hero-sub">curated by Group 4</p>
        <p className="hero-desc">
          Not just a café list it's a mood-matching engine for Tagum's best spaces.
          Whether you need Wi-Fi for six hours, a cake worth photographing,
          or the most beautiful corner in the city, we'll find it for you.
        </p>
        <button className="hero-cta" onClick={scrollToMood}>
          Find My Spot
          <span className="hero-cta-arrow">↓</span>
        </button>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;