const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Funkcja wczytująca bazę wycieków z pliku leaks.json
function loadLeaks() {
    try {
        const filePath = path.join(__dirname, 'leaks.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error("Błąd podczas wczytywania bazy wycieków:", err);
    }
    return [];
}

app.get('/player-stats', (req, res) => {
    const player = req.query.player;
    if (!player) {
        return res.status(400).json({ error: "Nie podano nicku gracza" });
    }

    // Wczytujemy bazę dynamicznie lub trzymamy w pamięci
    const leakedPlayersDatabase = loadLeaks();

    // Szukamy gracza w bazie (ignorując wielkość liter)
    const foundPlayer = leakedPlayersDatabase.find(
        p => p.name && p.name.toLowerCase() === player.toLowerCase()
    );

    if (foundPlayer) {
        res.json({
            player: foundPlayer.name,
            leakStatus: foundPlayer.leakStatus || "wyciek",
            ip: foundPlayer.ip || "Ukryte IP"
        });
    } else {
        // Jeśli gracza nie ma w bazie 15k+ wycieków
        res.json({
            player: player,
            leakStatus: "brak",
            ip: "Brak w bazie"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer API z bazą wycieków działa na porcie ${PORT}`);
});
