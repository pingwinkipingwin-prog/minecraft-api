const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Twoja baza danych: Nick gracza -> Adres IP
const ipDatabase = {
    "Gracz1": "123.45.67.89",
    "Gracz2": "98.76.54.32"
};

app.get('/get-ip', (req, res) => {
    const player = req.query.player;
    if (player && ipDatabase[player]) {
        res.json({ ip: ipDatabase[player] });
    } else {
        res.status(404).json({ ip: "Brak w bazie" });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer API działa na porcie ${PORT}`);
});
