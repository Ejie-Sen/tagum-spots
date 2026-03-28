import React from 'react';

const moodLabels = {
  work: 'Focus & Productivity',
  eat: 'Cravings & Desserts',
  chill: 'Aesthetic & Social',
};

const tagIcons = {
  'Fast WiFi': '⚡', 'Air Conditioning': '❄️', 'Outdoor Seating': '🍃', 
  'Pet Friendly': '🐾', 'Power Outlets': '🔌', 'Study Tables': '📚', 'Parking': '🚗',
  'Signature Cakes': '🍰', 'Milktea': '🧋', 'Family-Friendly': '👨‍👩‍👧‍👦', 'Aircon': '❄️',
  'Pastry Fresh Daily': '🍰', 'Coffee & Tea': '☕', 'Takeout Boxes': '🎁', 
  'Date Spot': '💕', 'Floral Pastries': '🌸', 'Seasonal Flavors': '🍓', 'Gift Boxes': '🎁',
  'Quiet Vibe': '🤫', 'Specialty Coffee': '☕', 
  'Wi-Fi Ready': '📶', 'Charging Points': '🔋', 'Dim Lighting': '🕯️',
  'Ultra-Fast Wi-Fi': '🚀', 'Standing Desk Area': '🧍', 'Enforced Quiet Zone': '🤫', 'Printer Available': '🖨️',
  'Fresh-Baked Daily': '🥐', 'Milk Pairings': '🥛', 'Homey Atmosphere': '🏡', 'Cupcakes Too': '🧁',
  'Instagrammable': '📸', 'Plush Seating': '🛋️', 'Botanical Decor': '🌿', 'Natural Light': '☀️',
  'Dark Aesthetic': '🖤', 'Candlelit Corners': '🕯️', 'Curated Playlist': '🎵', 'Photo Walls': '🖼️',
  'Homey Interiors': '🏡', 'Bean Bags': '🛋️', 'Warm Lighting': '💡', 'Chill Playlist': '🎶',
  'Floor-to-Ceiling Windows': '🪟', 'Mirror Walls': '🪞', 'Fresh Florals Weekly': '💐', 'Tripod-Friendly': '📸'
};

function CardsGrid({ shops, currentMood, searchQuery, openModal }) {
  if (shops.length === 0) {
    return (
      <section className="results-section" id="results">
        <div className="empty-state">
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <p>No spots matched. Try a different search!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="results-section" id="results">
      <div className="results-header">
        <h2 className="results-title">
          {/* DYNAMIC TITLE: Switches format if search is active */}
          {searchQuery && searchQuery.trim() !== '' ? (
            <>Search Results for <span>"{searchQuery}"</span></>
          ) : (
            <>Spots for <span>{moodLabels[currentMood]}</span></>
          )}
        </h2>
        <span className="results-count">Showing {shops.length} spots</span>
      </div>

      <div className="cards-grid">
        {shops.map((shop, index) => {
          let parsedTags = [];
          try {
            if (Array.isArray(shop.tags)) {
              parsedTags = shop.tags;
            } else if (typeof shop.tags === 'string') {
              parsedTags = JSON.parse(shop.tags);
            }
          } catch (e) {
            console.error("Grid Tag Parse Error for:", shop.name);
          }

          const finalAmenities = parsedTags.length > 0 ? parsedTags : (shop.vibes || []);

          return (
            <div 
              className="spot-card" 
              key={shop.id} 
              onClick={() => openModal(shop)}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {shop.image_url ? (
                <img 
                  src={shop.image_url} 
                  alt={shop.name} 
                  className="card-image" 
                />
              ) : (
                <div className="card-img-placeholder" style={{ background: shop.bgGradient || shop.bg_gradient || '#333' }}>
                  {shop.emoji || '📍'}
                </div>
              )}

              <div className="card-body">
                <span className="card-badge">⭐ {shop.badge || 'New Spot'}</span>
                <h3 className="card-name">{shop.name}</h3>
                <p className="card-tagline">{shop.tagline}</p>
                
                <div className="card-vibes">
                  {finalAmenities.map((tag, i) => (
                    <span key={i} className="vibe-tag">
                      {tagIcons[tag] || '✨'} {tag}
                    </span>
                  ))}
                </div>
                
                <div className="card-must-try">
                  <strong>✦ Must Try</strong>
                  <br />
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