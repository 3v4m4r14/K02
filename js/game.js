var lives = 3;
var score = 0;
var correctAnswer;
var colours = ["red", "blue"];
document.onkeydown = chooseKeyAction;

$('#leftBtn').click(function () {
    moveLeft();
});
$('#rightBtn').click(function () {
    moveRight();
});

function Square() {
    var colourIdx = Math.round(Math.random());
    this.colour = colours[colourIdx];
}

function startGame() {
    lives = 3;
    score = 0;
    correctAnswer = getRandomMathOperation();
    makeGameVisible();
    $('#answerCheckBtn').click(function () {
        checkAnswer();
    });
}

function gameOver() {
    console.log("GameOver");
    makeGameInvisible();
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

    if (correctAnswer === parseInt(userAnswer)) {
        score += correctAnswer;
    } else {
        score -= correctAnswer;
        updateLives();
    }
    updateScore();
    emptyAnswerInputBox();
    correctAnswer = getRandomMathOperation();
}

function chooseKeyAction(e) {
    e = e || window.event;
    switch (e.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "Enter":
            e.preventDefault();
            checkAnswer();
    }
}

function updateScore() {
    $('#score').text("" + score);
}

function updateLives() {
    removeLife();
    $('#lives').text("" + lives);
}

function emptyAnswerInputBox() {
    $('#answer').val("");
}

function makeGameVisible() {
    $('#scoreScreen').css("visibility", "visible");
}

function makeGameInvisible() {
    $('#scoreScreen').css("visibility", "hidden");
}