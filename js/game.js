var lives = 3;
var colours = ["red", "blue"];

function Square() {
    var colourIdx = Math.random() * 2;

    this.colour = colours[colourIdx];
}

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
