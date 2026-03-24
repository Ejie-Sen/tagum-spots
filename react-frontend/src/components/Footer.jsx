import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Tagum Spots</div>
      <p>
        Curated with ☕ by <strong style={{ color: 'var(--gold)' }}>Group 4</strong>
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.72rem', opacity: 0.5 }}>
        BSIT · Tagum City, Davao del Norte · 2025
      </p>
    </footer>
  );
}

export default Footer;