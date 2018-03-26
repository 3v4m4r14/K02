var lives = 3;

function startGame() {
    lives = 3;
}

function gameOver() {

}

function removeLife() {
    if (lives > 0) {
        lives -= 1;
    }
    if (lives === 0) {
        gameOver();
    }
}