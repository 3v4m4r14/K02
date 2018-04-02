var lives = 3;
var score = 0;
var correctAnswer;
var colours = ["red", "blue"];
document.onkeydown = chooseKeyAction;

function Square() {
    var colourIdx = Math.round(Math.random());
    this.colour = colours[colourIdx];
}

function startGame() {
    lives = 3;
    score = 0;
    correctAnswer = getRandomMathOperation();
    $('#answerCheckBtn').click(function () {
        checkAnswer();
    });
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

function getRandomMathOperation() {
    var a = Math.floor((Math.random() * 10) + 1);
    var b = Math.floor((Math.random() * 10) + 1);
    var sum = a + b;
    correctAnswer = sum;

    var answerLabel = $('#answerLabel');
    answerLabel.text(a + " + " + b + " = ");

    return sum;
}

function checkAnswer() {
    var userAnswer = $('#answer').val();

    console.log(correctAnswer, userAnswer);

    if (correctAnswer === parseInt(userAnswer)) {
        score += correctAnswer;
        console.log("Correct! Score: " + score);
    } else {
        score -= correctAnswer;
        removeLife();
        console.log("Incorrect Score: " + score);
    }
    updateScore();
    correctAnswer = getRandomMathOperation();
}

function chooseKeyAction(e) {
    e = e || window.event;
    switch (e.key) {
        case "ArrowLeft":
            moveLeft(); //TODO
            break;
        case "ArrowRight":
            moveRight(); //TODO
            break;
        case "Enter":
            e.preventDefault();
            checkAnswer();
    }
}

function updateScore() {
    $('#score').text("" + score);
}