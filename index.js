const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/player-stats', (req, res) => {
    const player = req.query.player;
    if (player) {
        res.json({ player: player, status: "online", ping: 45 });
    } else {
        res.status(400).json({ error: "Nie podano nicku gracza" });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer API działa na porcie ${PORT}`);
});
