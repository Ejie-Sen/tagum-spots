import React, { useState } from 'react';

function Admin() {
  const [formData, setFormData] = useState({
    name: '', mood: 'work', badge: 'New Spot', emoji: '☕',
    bgGradient: 'linear-gradient(135deg, #2b1b12, #4a3623)', tagline: '',
    mustTry: '', mapsUrl: ''
  });
  
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:3000/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Network failure');

      setStatus('success');
      // Reset text fields after successful injection
      setFormData({ ...formData, name: '', tagline: '', mustTry: '', mapsUrl: '' }); 
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error("Injection failed:", error);
      setStatus('error');
    }
  };

  const lockVault = () => {
    window.location.href = '/'; // Strips the URL parameter and reloads the public app
  };

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <button onClick={lockVault} style={{ marginBottom: '2rem', cursor: 'pointer', padding: '0.5rem 1rem', background: '#eee', border: '1px solid #ccc', borderRadius: '4px' }}>
        ← Lock Vault & Return
      </button>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--espresso, #2e1503)' }}>Secure Database Injection</h2>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Push new coffee shops directly into MySQL.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Shop Name (e.g., The Daily Grind)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <select name="mood" value={formData.mood} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="work">Focus & Productivity</option>
          <option value="eat">Cravings & Desserts</option>
          <option value="chill">Aesthetic & Social</option>
        </select>

        <input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline (e.g., Best espresso in town)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="emoji" value={formData.emoji} onChange={handleChange} placeholder="Emoji (e.g., 🍰)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="bgGradient" value={formData.bgGradient} onChange={handleChange} placeholder="CSS Gradient (e.g., linear-gradient(...))" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="badge" value={formData.badge} onChange={handleChange} placeholder="Badge (e.g., Top Rated)" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="mustTry" value={formData.mustTry} onChange={handleChange} placeholder="Must Try Item" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="mapsUrl" value={formData.mapsUrl} onChange={handleChange} placeholder="Google Maps URL" required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />

        <button type="submit" disabled={status === 'loading'} style={{ padding: '1rem', background: 'var(--espresso, #2e1503)', color: 'var(--light-cream, #fdfbf7)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {status === 'loading' ? 'Executing Injection...' : 'Deploy to Database'}
        </button>
      </form>
      
      {status === 'success' && <p style={{ marginTop: '1rem', color: '#155724', background: '#d4edda', padding: '1rem', borderRadius: '4px', border: '1px solid #c3e6cb' }}>✅ Data successfully written to MySQL.</p>}
      {status === 'error' && <p style={{ marginTop: '1rem', color: '#721c24', background: '#f8d7da', padding: '1rem', borderRadius: '4px', border: '1px solid #f5c6cb' }}>❌ Backend connection refused. Check Node server.</p>}
    </section>
  );
}

export default Admin;