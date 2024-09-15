const express = require('express');
const bodyParser = require('body-parser');
const { fetchPlayerData, fetchInjuryData } = require('./fetchData');
const getOptimalLineup = require('./optimizer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/optimize', async (req, res) => {
    const players = req.body.players;

    const fetchedPlayers = await fetchPlayerData();
    const injuries = await fetchInjuryData();

    const matchups = []; // Add real matchups data here
    const optimalPlayers = await getOptimalLineup();

    const optimizedPlayers = optimalPlayers.map(player => {
        const existingPlayer = players.find(p => p.name === player.name);
        return {
            ...existingPlayer,
            score: player.score
        };
    });

    res.json({ players: optimizedPlayers });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
