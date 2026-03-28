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
        <div style={{ 
          display: 'flex', width: '100%', maxWidth: '500px', marginBottom: '2rem', 
          background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '100px', 
          border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
          opacity: 0, animation: 'fadeUp 0.9s ease 0.8s forwards' 
        }}>
          <span style={{ padding: '0 1.2rem', display: 'flex', alignItems: 'center', fontSize: '1.2rem', opacity: 0.8 }}></span>
          <input 
            type="text" 
            placeholder="Search a specific café or vibe..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '1rem' }}
          />
          <button 
            onClick={executeSearch}
            style={{ 
              background: 'var(--amber)', color: 'var(--espresso)', border: 'none', 
              padding: '0.8rem 1.8rem', borderRadius: '100px', fontWeight: 'bold', 
              cursor: 'pointer', transition: 'all 0.3s' 
            }}
          >
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