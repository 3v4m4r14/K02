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

}

function removeLife() {
    if (lives > 0) {
        lives -= 1;
    }
    if (lives === 0) {
        gameOver();
    }
}