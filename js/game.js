var lives = 3;
var colours = ["red", "blue"];

function Square() {
    var colourIdx = Math.round(Math.random());
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

function getRandomMathOperation() {
    var a = Math.floor((Math.random() * 10) + 1);
    var b = Math.floor((Math.random() * 10) + 1);
    var sum = a + b;

    var answerLabel = $('#answerLabel');
    answerLabel.text(a + " + " + b + " = ");

    return sum;
}

function checkAnswer(correctAnswer) {
    var userAnswer = $('#answer').val();

    console.log(correctAnswer, userAnswer);

    if (correctAnswer === parseInt(userAnswer)) {
        console.log("Correct!");
    } else {
        console.log("Incorrect");
    }
}

$('#startBtn').click(function () {
    var correctAnswer = getRandomMathOperation();
    $('#answerCheckBtn').click(function () {
        checkAnswer(correctAnswer);
    });
});
