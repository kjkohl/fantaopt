const { fetchPlayerData, fetchInjuryData } = require('./fetchData');

function calculatePlayerScore(player, injuries, matchups) {
    let score = parseFloat(player.points);

    // Adjust score based on injury status
    const injury = injuries.find(injury => injury.name === player.name);
    if (injury) {
        if (injury.status.includes('Injured')) {
            score *= 0.5; // Reduce score for injured players
        } else if (injury.status.includes('Questionable')) {
            score *= 0.8; // Reduce score for questionable players
        }
    }

    // Adjust score based on matchup (this is a placeholder; replace with actual logic)
    const matchup = matchups.find(matchup => matchup.name === player.name);
    if (matchup) {
        if (matchup.difficultOpponent) {
            score *= 0.9; // Reduce score for tough matchups
        }
    }

    return score;
}

function optimizeLineup(players, injuries, matchups) {
    // Calculate scores and sort players by score
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player, injuries, matchups),
    }));
    
    return scoredPlayers.sort((a, b) => b.score - a.score).slice(0, 5);
}

async function getOptimalLineup() {
    const players = await fetchPlayerData();
    const injuries = await fetchInjuryData();
    const matchups = []; // Fetch or define opponent matchups and defensive stats here

    const optimalLineup = optimizeLineup(players, injuries, matchups);
    return optimalLineup;
}

module.exports = getOptimalLineup;
