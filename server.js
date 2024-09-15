const express = require('express');
const path = require('path');
const getOptimalLineup = require('./optimizer');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/optimal-lineup', async (req, res) => {
    try {
        const optimalLineup = await getOptimalLineup();
        res.json(optimalLineup);
    } catch (error) {
        res.status(500).send('Error generating optimal lineup.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
