import React from 'react';

function Hero({ searchQuery, setSearchQuery }) {
  const executeSearch = () => {
    // If they typed a search, scroll directly to results. Otherwise, scroll to mood selector.
    const target = searchQuery.trim() !== '' ? 'results' : 'mood';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
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
        <p className="hero-eyebrow">☕ Your Tagum Locals Coffee</p>
        <h1 className="hero-title">Find Your<br/><em>Perfect Spot</em></h1>
        <p className="hero-sub">curated by Group 4</p>
        <p className="hero-desc">
          Not just a café list it's a mood-matching engine for Tagum's best spaces.
          Whether you need Wi-Fi for six hours, a cake worth photographing,
          or the most beautiful corner in the city, we'll find it for you.
        </p>
        
        {/* --- SEARCH ENGINE UI --- */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Search a specific café or vibe..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
          />
          <button className="search-btn" onClick={executeSearch}>
            Search
          </button>
        </div>
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