var lives = 3;

function startGame() {
    lives = 3;
}

function gameOver() {
    console.log("GameOver");
}

function removeLife() {
    if (lives > 0) {
        lives--;
    }
    if (lives === 0) {
        gameOver();
    }
}
