const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential: This allows Node to read the JSON tags from React

// Upgraded Database Connection (Cloud & SSL Ready)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Required to establish the SSL handshake with Aiven
  }
});

// 1. GET: Fetch all shops (Existing Route)
app.get('/api/shops', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shops');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. POST: Execute new shop injection (The Upgraded Route)
app.post('/api/shops', async (req, res) => {
  try {
    // INJECTED: image_url added to the extracted body parameters
    const { mood, name, badge, emoji, bgGradient, image_url, tagline, mustTry, mapsUrl, tags } = req.body;
    
    if (!name || !mood || !tagline) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const tagsJson = JSON.stringify(tags || []);

    // INJECTED: image_url added to the columns and an extra '?' added to VALUES
    const query = `
      INSERT INTO shops (mood, name, badge, emoji, bg_gradient, image_url, tagline, must_try, maps_url, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // INJECTED: image_url added to the execution array in the exact same order
    const [result] = await db.query(query, [mood, name, badge, emoji, bgGradient, image_url, tagline, mustTry, mapsUrl, tagsJson]);
    
    res.status(201).json({ success: true, newId: result.insertId });
  } catch (error) {
    console.error("Database write failed:", error);
    res.status(500).json({ success: false, error: 'Failed to write to database' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});