document.getElementById('addPlayer').addEventListener('click', function() {
    const playerInputs = document.getElementById('playerInputs');
    const newPlayerInput = document.createElement('div');
    newPlayerInput.classList.add('player-input');
    newPlayerInput.innerHTML = `
        <input type="text" class="player-name" placeholder="Player Name" required>
        <input type="number" class="player-points" placeholder="Points" required>
        <input type="text" class="player-status" placeholder="Status (Injured, Questionable, etc.)">
    `;
    playerInputs.appendChild(newPlayerInput);
});

document.getElementById('teamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const playerInputs = document.querySelectorAll('.player-input');
    const players = Array.from(playerInputs).map(input => {
        return {
            name: input.querySelector('.player-name').value,
            points: parseInt(input.querySelector('.player-points').value, 10),
            status: input.querySelector('.player-status').value
        };
    });

    // Fetch data from the server
    const response = await fetch('/optimize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ players })
    });
    const result = await response.json();

    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = '<h2>Optimized Team</h2>';
    result.players.forEach(player => {
        resultSection.innerHTML += `
            <p><strong>${player.name}</strong>: ${player.score.toFixed(2)} points (${player.status})</p>
        `;
    });
});
