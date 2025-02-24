// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Helper function to scrape WAR data from a given URL
async function getWarData(url) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    // Example selectors – adjust these based on the actual page structure.
    const springWar = $('#WAR-spring').text().trim();
    const regularSeasonWar = $('#WAR-regular').text().trim();
    
    return { springWar, regularSeasonWar };
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return { springWar: 'N/A', regularSeasonWar: 'N/A' };
  }
}

// Endpoint for Jace Jung data
app.get('/api/war?player=jung', async (req, res) => {
  // Replace the URL below with Jace Jung's actual page URL on baseball-reference.com
  const url = 'https://www.baseball-reference.com/players/j/jungja01.shtml';
  const data = await getWarData(url);
  res.json({ player: 'Jace Jung', ...data });
});

// Endpoint for Alex Bregman data
app.get('/api/war?player=bregman', async (req, res) => {
  // Replace the URL below with Alex Bregman's actual page URL on baseball-reference.com
  const url = 'https://www.baseball-reference.com/players/b/bregmal01.shtml';
  const data = await getWarData(url);
  res.json({ player: 'Alex Bregman', ...data });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
