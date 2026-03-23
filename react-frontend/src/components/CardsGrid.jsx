import React from 'react';

// Dictionary to map the raw mood value to the display title
const moodLabels = {
  work: 'Focus & Productivity',
  eat: 'Cravings & Desserts',
  chill: 'Aesthetic & Social',
};

function CardsGrid({ shops, currentMood, openModal }) {
  if (shops.length === 0) {
    return (
      <section className="results-section" id="results">
        <div className="empty-state">
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <p>No spots matched. Try another mood!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="results-section" id="results">
      <div className="results-header">
        <h2 className="results-title">Spots for <span>{moodLabels[currentMood]}</span></h2>
        <span className="results-count">Showing {shops.length} curated spots</span>
      </div>

      <div className="cards-grid">
        {shops.map((shop, index) => {
          // Defensive check in case a shop has no vibes yet
          const safeVibes = shop.vibes || [];
          
          return (
            <div 
              className="spot-card" 
              key={shop.id} 
              onClick={() => openModal(shop)}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* FIX 1: Check for bgGradient */}
              <div className="card-img-placeholder" style={{ background: shop.bgGradient || shop.bg_gradient || '#333' }}>
                {shop.emoji || '📍'}
              </div>
              <div className="card-body">
                <span className="card-badge">⭐ {shop.badge || 'New Spot'}</span>
                <h3 className="card-name">{shop.name}</h3>
                <p className="card-tagline">{shop.tagline}</p>
                
                <div className="card-vibes">
                  {safeVibes.map((v, i) => <span key={i} className="vibe-tag">{v}</span>)}
                </div>
                
                <div className="card-must-try">
                  <strong>✦ Must Try</strong>
                  <br />
                  {/* FIX 2: Check for mustTry */}
                  {shop.mustTry || shop.must_try || 'Ask the barista!'}
                </div>
                
                <div className="card-actions">
                  <button 
                    className="btn-primary" 
                    onClick={(e) => { e.stopPropagation(); openModal(shop); }}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn-secondary" 
                    /* FIX 3: Check for mapsUrl */
                    onClick={(e) => { e.stopPropagation(); window.open(shop.mapsUrl || shop.maps_url, '_blank'); }}
                  >
                    📍 Directions
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardsGrid;