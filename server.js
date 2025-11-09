import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('🎧 Trashcore Proxy is running');
});

app.get('/api/proxy', async (req, res) => {
  const { url } = req.query;
  console.log("🔗 Incoming YouTube URL:", url);

  if (!url) return res.status(400).json({ error: 'Missing YouTube URL' });

  try {
    const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytmp3?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    console.log("✅ API response:", response.data);

    res.json(response.data);
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));
