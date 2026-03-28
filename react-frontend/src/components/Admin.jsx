import React, { useState } from 'react';

function Admin() {
  const [formData, setFormData] = useState({
    name: '', mood: 'work', badge: 'New Spot', emoji: '☕',
    imageUrl: '', tagline: '', mustTry: '', mapsUrl: '', tags: [] 
  });
  
  const [status, setStatus] = useState('idle');

  const availableTags = [
    'Fast WiFi', 'Power Outlets', 'Study Tables', 'Quiet Vibe', 
    'Air Conditioning', 'Outdoor Seating', 'Parking', 'Pet Friendly', 
    'Specialty Coffee', 'Pastry Fresh Daily', 'Date Spot', 'Family-Friendly'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const hasTag = prev.tags.includes(tag);
      return {
        ...prev,
        tags: hasTag ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      image_url: formData.imageUrl
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const response = await fetch(`${API_URL}/api/shops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Network failure');

      setStatus('success');
      setFormData({ ...formData, name: '', imageUrl: '', tagline: '', mustTry: '', mapsUrl: '', tags: [] }); 
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error("Injection failed:", error);
      setStatus('error');
    }
  };

  const lockVault = () => {
    window.location.href = '/'; 
  };

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <button onClick={lockVault} style={{ marginBottom: '2rem', cursor: 'pointer', padding: '0.5rem 1rem', background: '#eee', border: '1px solid #ccc', borderRadius: '4px' }}>
        ← Lock Vault & Return
      </button>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--espresso, #2e1503)' }}>Secure Database Injection</h2>

      {/* INJECTED: autoComplete="off" to silence Chrome DevTools warnings */}
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Shop Name" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <select name="mood" value={formData.mood} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="work">Focus & Productivity</option>
          <option value="eat">Cravings & Desserts</option>
          <option value="chill">Aesthetic & Social</option>
        </select>

        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', background: '#fafafa' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '0.9rem' }}>Select Amenities (Tags)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {availableTags.map(tag => (
              <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', cursor: 'pointer', background: formData.tags.includes(tag) ? '#e6dfd8' : '#fff', padding: '0.3rem 0.6rem', border: '1px solid #ddd', borderRadius: '20px' }}>
                <input 
                  type="checkbox" 
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  style={{ display: 'none' }}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="emoji" value={formData.emoji} onChange={handleChange} placeholder="Emoji (e.g., ☕)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="High-Res Image URL (Imgur, Unsplash, etc.)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <input name="badge" value={formData.badge} onChange={handleChange} placeholder="Badge (e.g., THE CODER'S DEN)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="mustTry" value={formData.mustTry} onChange={handleChange} placeholder="Must Try Item" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="mapsUrl" value={formData.mapsUrl} onChange={handleChange} placeholder="Google Maps URL" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />

        <button type="submit" disabled={status === 'loading'} style={{ padding: '1rem', background: 'var(--espresso, #2e1503)', color: 'var(--light-cream, #fdfbf7)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {status === 'loading' ? 'Executing Injection...' : 'Deploy to Database'}
        </button>
      </form>
    </section>
  );
}

export default Admin;