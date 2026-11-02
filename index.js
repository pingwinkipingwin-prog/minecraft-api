const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Baza danych: nicki, status wycieku oraz adresy IP
const leakedPlayersDatabase = [
    { name: "ZlyGracz123", ip: "192.168.1.100", leakStatus: "wyciek" },
    { name: "TestUser", ip: "10.0.0.50", leakStatus: "wyciek" },
    { name: "Jestem_Neon", ip: "185.220.101.5", leakStatus: "wyciek" },
    { name: "_xvn", ip: "45.154.255.88", leakStatus: "wyciek" }
];

app.get('/player-stats', (req, res) => {
    const player = req.query.player;
    if (!player) {
        return res.status(400).json({ error: "Nie podano nicku gracza" });
    }

    // Szukamy gracza w bazie (ignorując wielkość liter)
    const foundPlayer = leakedPlayersDatabase.find(
        p => p.name.toLowerCase() === player.toLowerCase()
    );

    if (foundPlayer) {
        res.json({
            player: foundPlayer.name,
            leakStatus: foundPlayer.leakStatus,
            ip: foundPlayer.ip
        });
    } else {
        // Jeśli gracza nie ma w bazie wycieków
        res.json({
            player: player,
            leakStatus: "brak",
            ip: "Brak w bazie"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer API działa na porcie ${PORT}`);
});
