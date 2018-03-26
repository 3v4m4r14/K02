var lives = 3;
var id;

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

function myMove() {
    move('#square')
    .y(100)
        .then()
        .x(100)
            .then()
            .y(100)
                .then()
                .scale(1.2)
                    .then()
                    .scale(1 / 1.2)
                    .translate(-100, -200)
                    .duration('0s')
                    .pop().duration('0.2s')
                .pop().duration('0.2s')
            .pop().duration('0.2s')
        .pop().duration('0.2s')
    .end();
}
