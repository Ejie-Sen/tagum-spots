import React, { useEffect } from 'react';

function Modal({ shop, closeModal }) {
  // 1. Lock background scrolling when modal opens
  useEffect(() => {
    if (shop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [shop]);

  // 2. Allow closing with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // If no shop is selected, render absolutely nothing
  if (!shop) return null;

  // Defensive rendering against empty database arrays
  const safeVibes = shop.vibes || [];
  const safeStats = shop.stats || [];
  const safeMenu = shop.menu || [];

  return (
    <div className="modal-overlay open" onClick={closeModal}>
      {/* e.stopPropagation() prevents clicking inside the white box from closing the modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-hero" style={{ background: shop.bgGradient || shop.bg_gradient || '#333' }}>
          <button className="modal-close" onClick={closeModal}>✕</button>
          <span style={{ position: 'relative', zIndex: 1, fontSize: '5rem' }}>
            {shop.emoji || '📍'}
          </span>
        </div>
        
        <div className="modal-body">
          <p className="modal-badge">⭐ {shop.badge}</p>
          <h2 className="modal-name">{shop.name}</h2>
          <p className="modal-tagline">{shop.tagline}</p>

          <div className="modal-vibes">
            {safeVibes.map((v, i) => <span key={i} className="vibe-tag">{v}</span>)}
          </div>

          <div className="modal-grid">
            {safeStats.map((s, i) => (
              <div key={i} className="modal-stat">
                <div className="modal-stat-label">{s.label}</div>
                {/* Fallback for different DB column names */}
                <div className="modal-stat-val">{s.stat_value || s.value}</div> 
              </div>
            ))}
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">🍽️ Signature Menu</h3>
            {safeMenu.length > 0 ? (
              <ul className="menu-list">
                {safeMenu.map((m, i) => (
                  <li key={i} className="menu-item">
                    <span className="menu-item-name">
                      {m.item_name || m.name}
                      {(m.is_starred || m.star) && <span className="menu-item-star">★</span>}
                    </span>
                    <span className="menu-item-price">₱{m.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                Menu details currently unavailable.
              </p>
            )}
          </div>

          <div className="modal-actions">
            <button 
              className="modal-btn modal-btn-primary" 
              onClick={() => window.open(shop.mapsUrl || shop.maps_url, '_blank')}
            >
              📍 Get Directions
            </button>
            <button className="modal-btn modal-btn-secondary" onClick={closeModal}>
              ← Back to Results
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Modal;