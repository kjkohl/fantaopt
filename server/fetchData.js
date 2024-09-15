const axios = require('axios');
const cheerio = require('cheerio');

const PLAYER_URL = 'https://fantasy.espn.com/football/leaders?statSplit=currSeason&scoringPeriodId=0';
const INJURY_URL = 'https://www.espn.com/nfl/injuries';

async function fetchPlayerData() {
    try {
        const { data } = await axios.get(PLAYER_URL);
        const $ = cheerio.load(data);
        const players = [];

        // Extract player data
        $('table tbody tr').each((i, element) => {
            const name = $(element).find('td:nth-of-type(1)').text().trim();
            const position = $(element).find('td:nth-of-type(2)').text().trim();
            const points = $(element).find('td:nth-of-type(3)').text().trim();

            players.push({ name, position, points });
        });

        return players;
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

async function fetchInjuryData() {
    try {
        const { data } = await axios.get(INJURY_URL);
        const $ = cheerio.load(data);
        const injuries = [];

        // Extract injury data
        $('.Table__TR--sm').each((i, element) => {
            const name = $(element).find('td:nth-of-type(1)').text().trim();
            const status = $(element).find('td:nth-of-type(3)').text().trim();

            injuries.push({ name, status });
        });

        return injuries;
    } catch (error) {
        console.error('Error fetching injury data:', error);
    }
}

module.exports = { fetchPlayerData, fetchInjuryData };
