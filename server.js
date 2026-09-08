const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());

// Logo endpoint'i
app.get('/logo', (req, res) => {
    res.json({ logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" });
});

app.post('/play', async (req, res) => {
    const ytUrl = req.body.url;
    if (!ytdl.validateURL(ytUrl)) {
        return res.status(400).json({ error: "Geçersiz YouTube linki!" });
    }

    try {
        const info = await ytdl.getInfo(ytUrl);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        res.json({ streamUrl: audioFormat.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda aktif!`));
