import React from 'react';

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

function Modal({ shop, closeModal }) {
  if (!shop) return null;

  let amenities = [];
  try {
    if (Array.isArray(shop.tags)) {
      amenities = shop.tags;
    } else if (typeof shop.tags === 'string') {
      amenities = JSON.parse(shop.tags); 
    }
  } catch (error) {
    console.error("Failed to parse amenities for:", shop.name, error);
  }

  return (
    <div className="modal-overlay open" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        {/* --- MODAL IMAGE ENGINE --- */}
        {shop.image_url ? (
          <div className="modal-hero" style={{ padding: 0 }}>
            <img 
              src={shop.image_url} 
              alt={shop.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ) : (
          <div className="modal-hero" style={{ background: shop.bgGradient || shop.bg_gradient || '#2b1b12' }}>
            <span style={{ fontSize: '4rem' }}>{shop.emoji}</span>
          </div>
        )}

        <div className="modal-body">
          <p className="modal-badge">⭐ {shop.badge}</p>
          <h2 className="modal-name">{shop.name}</h2>
          <p className="modal-tagline"><em>{shop.tagline}</em></p>

          <hr style={{ margin: '1.5rem 0', opacity: 0.1 }} />

          <div className="modal-section">
            <h4 className="modal-section-title">
              ✨ Amenities & Features
            </h4>
            
            <div className="modal-vibes">
              {amenities.length > 0 ? (
                amenities.map((tag, index) => (
                  <span key={index} className="vibe-tag" style={{ background: '#f4f1ee' }}>
                    {tagIcons[tag] || '✨'} {tag}
                  </span>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
                  No amenities listed for this spot yet.
                </p>
              )}
            </div>
          </div>

          <div className="modal-actions" style={{ marginTop: '2rem' }}>
            <button className="modal-btn modal-btn-secondary" onClick={closeModal}>
              ← Back to Results
            </button>
            <a 
              href={shop.mapsUrl || shop.maps_url} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-btn modal-btn-primary" 
              style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;