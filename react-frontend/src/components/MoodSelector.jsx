import React from 'react';

function MoodSelector({ currentMood, setCurrentMood }) {
  return (
    <section className="mood-section" id="mood">
      <p className="section-label">Step 1 — Choose your mood</p>
      <h2 className="mood-heading">What brings you<br/><em>out today?</em></h2>
      <p className="mood-sub">Tap a vibe. We'll handle the rest.</p>

      <div className="mood-buttons">
        <button 
          className={`mood-btn work ${currentMood === 'work' ? 'active' : ''}`} 
          onClick={() => setCurrentMood('work')}
        >
          <span className="mood-icon">💻</span>
          <div className="mood-btn-title">Focus & Productivity</div>
          <div className="mood-btn-desc">You need fast Wi-Fi, a quiet corner, and enough outlets to survive the deadline.</div>
          <span className="mood-pill">🎓 Student / Freelancer</span>
        </button>

        <button 
          className={`mood-btn eat ${currentMood === 'eat' ? 'active' : ''}`} 
          onClick={() => setCurrentMood('eat')}
        >
          <span className="mood-icon">🍰</span>
          <div className="mood-btn-title">Cravings & Desserts</div>
          <div className="mood-btn-desc">You came for the brazo de mercedes and the mango frappe — in that order.</div>
          <span className="mood-pill">🍴 Foodie / Family</span>
        </button>

        <button 
          className={`mood-btn chill ${currentMood === 'chill' ? 'active' : ''}`} 
          onClick={() => setCurrentMood('chill')}
        >
          <span className="mood-icon">✨</span>
          <div className="mood-btn-title">Aesthetic & Social</div>
          <div className="mood-btn-desc">You want a backdrop that makes the whole squad look like they're in a film.</div>
          <span className="mood-pill">📸 Date / Friends</span>
        </button>
      </div>
    </section>
  );
}

export default MoodSelector;