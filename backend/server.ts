const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// APIキー (仮の値、実際のAPIキーを使用してください)
const API_KEY = 'YOUR_API_KEY_HERE';

// CORS設定
app.use(cors());

// 鳥のリストを返すエンドポイント
app.get('/birds', async (req, res) => {
  try {
    const response = await fetch('https://example.com/api/birds', {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    if (!response.ok) throw new Error('Failed to fetch birds list');
    const birds = await response.json();
    res.json(birds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 指定された鳥の画像を返すエンドポイント
app.get('/bird-image', async (req, res) => {
  const { birdName } = req.query;
  if (!birdName) {
    return res.status(400).json({ message: 'Bird name is required' });
  }
  try {
    const response = await fetch(`https://example.com/api/birds/${encodeURIComponent(birdName)}/image`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    if (!response.ok) throw new Error('Failed to fetch bird image');
    const birdImage = await response.json();
    res.json(birdImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});