const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Przykładowa lista lub baza graczy zgłoszonych/znalezionych w wyciekach
const leakedPlayers = ["ZlyGracz123", "TestUser"];

app.get('/player-stats', (req, res) => {
    const player = req.query.player;
    if (!player) {
        return res.status(400).json({ error: "Nie podano nicku gracza" });
    }

    // Sprawdzamy czy nick znajduje się na liście wycieków
    const hasLeak = leakedPlayers.includes(player);

    res.json({
        player: player,
        leakStatus: hasLeak ? "wyciek" : "brak"
    });
});

app.listen(PORT, () => {
    console.log(`Serwer API działa na porcie ${PORT}`);
});
