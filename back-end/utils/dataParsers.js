const parseShopData = (dbRow) => {
  // Defensive splitting functions to handle missing data
  const parseVibes = (raw) => raw ? raw.split('||') : [];
  
  const parseStats = (raw) => raw ? raw.split('||').map(s => { 
    const [label, value] = s.split('::'); 
    return { label, value }; 
  }) : [];
  
  const parseMenu = (raw) => raw ? raw.split('||').map(m => { 
    const [name, price, star] = m.split('::'); 
    return { name, price: parseFloat(price) || 0, star: star === '1' }; 
  }) : [];

  // Construct the final React-ready JSON object
  return {
    id: dbRow.id,
    mood: dbRow.mood,
    name: dbRow.name,
    badge: dbRow.badge,
    emoji: dbRow.emoji,
    bgGradient: dbRow.bg_gradient,
    tagline: dbRow.tagline,
    mustTry: dbRow.must_try,
    mapsUrl: dbRow.maps_url,
    vibes: parseVibes(dbRow.vibes_raw),
    stats: parseStats(dbRow.stats_raw),
    menu: parseMenu(dbRow.menu_raw),
  };
};

module.exports = { parseShopData };