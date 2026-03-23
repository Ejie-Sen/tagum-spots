const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const { parseShopData } = require('./utils/dataParsers'); // Importing the tool you just created

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/shops', async (req, res) => {
    try {
        // The massive string-smash query for ALL shops
        const query = `
            SELECT 
                s.id, s.mood, s.name, s.badge, s.emoji, s.bg_gradient, s.tagline, s.must_try, s.maps_url,
                (SELECT GROUP_CONCAT(vibe SEPARATOR '||') FROM shop_vibes WHERE shop_id = s.id) AS vibes_raw,
                (SELECT GROUP_CONCAT(CONCAT(label, '::', stat_value) SEPARATOR '||') FROM shop_stats WHERE shop_id = s.id) AS stats_raw,
                (SELECT GROUP_CONCAT(CONCAT(item_name, '::', price, '::', is_starred) SEPARATOR '||') FROM menu_items WHERE shop_id = s.id) AS menu_raw
            FROM shops s;
        `;
        
        const [rows] = await db.query(query);

        // Map through every single row from the database and push it through your parser
        const cleanData = rows.map(row => parseShopData(row));

        // Send the perfectly formatted payload to your frontend
        res.json(cleanData);
        
    } catch (error) {
        console.error("Database Query Failed:", error);
        res.status(500).json({ message: "Database failure" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});