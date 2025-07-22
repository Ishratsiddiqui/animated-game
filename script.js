document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
    const enemy = document.querySelector('.enemy');
    const playerHealthBar = document.querySelector('.player-health');
    const enemyHealthBar = document.querySelector('.enemy-health');
    const gameStatus = document.querySelector('.game-status');
    
    let playerHealth = 100;
    let enemyHealth = 100;
    let gameActive = true;
    let enemyAttackTimer;
    
    // Player attack
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'a' && gameActive) {
            playerAttack();
        }
    });
    
    function playerAttack() {
        if (player.classList.contains('player-attack')) return;
        
        player.classList.add('player-attack');
        player.src = "https://fightersgeneration.com/characters3/andrew-run.gif";
        
        setTimeout(() => {
            enemyHealth -= 20;
            updateHealthBars();
            
            if (enemyHealth <= 0) {
                endGame('You Win!');
            } else {
                enemyAttack();
            }
        }, 250);
        
        setTimeout(() => {
            player.classList.remove('player-attack');
            player.src = "https://fightersgeneration.com/characters3/andrew-stance.gif";
        }, 500);
    }
    
    function enemyAttack() {
        if (enemy.classList.contains('enemy-attack')) return;
        
        enemy.classList.add('enemy-attack');
        enemy.src = "https://fightersgeneration.com/characters3/andrew-run.gif";
        
        setTimeout(() => {
            playerHealth -= 10;
            updateHealthBars();
            
            if (playerHealth <= 0) {
                endGame('Game Over!');
            }
        }, 250);
        
        setTimeout(() => {
            enemy.classList.remove('enemy-attack');
            enemy.src = "https://fightersgeneration.com/characters3/andrew-stance.gif";
        }, 500);
    }
    
    function updateHealthBars() {
        playerHealthBar.style.width = `${playerHealth}%`;
        enemyHealthBar.style.width = `${enemyHealth}%`;
    }
    
    function endGame(message) {
        gameActive = false;
        gameStatus.textContent = message;
        gameStatus.style.display = 'block';
        
        clearInterval(enemyAttackTimer);
        
        // Reset game after 3 seconds
        setTimeout(() => {
            resetGame();
        }, 3000);
    }
    
    function resetGame() {
        playerHealth = 100;
        enemyHealth = 100;
        gameActive = true;
        updateHealthBars();
        gameStatus.style.display = 'none';
    }
    
    // Random enemy attacks
    function startEnemyAttacks() {
        enemyAttackTimer = setInterval(() => {
            if (gameActive && !enemy.classList.contains('enemy-attack')) {
                enemyAttack();
            }
        }, 2000);
    }
    
    startEnemyAttacks();
});



