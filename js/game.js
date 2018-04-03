var lives = 3;
var score = 0;
var correctAnswer;
var taskInterval = null;
var hasAnswer = false;
window.onkeydown = chooseKeyAction;
$('#leftBtn').click(function () {
    moveLeft();
});
$('#rightBtn').click(function () {
    moveRight();
});

function extraTaskInterval() {
    return setInterval(function () {
        extraTask();
    }, 10000);
}

function clearExtraTaskInterval() {
    clearInterval(taskInterval);
}

function restartExtraTaskInterval() {
    clearExtraTaskInterval();
    taskInterval = extraTaskInterval();
    console.log("restarted interval");
}

function startGame() {
    lives = 3;
    score = 0;
    correctAnswer = getRandomMathOperation();
    updateStats();
    showGame();
    hideModal();
    restartExtraTaskInterval();
    clearSquares();
    for (i = 0; i < 3; i++) {
        spawnNew();
    }
    $('#answerCheckBtn').click(function () {
        checkAnswer();
    });
}

function gameOver() {
    console.log("GameOver");
    hideGame();
    clearExtraTaskInterval();
    showModal();
}

function extraTask() {
    wobblyMaths();
    setTimeout(function () {
        hideMaths();
        if (!hasAnswer) {
            removeLife();
            updateLives();
        }
        hasAnswer = false;
    }, 5000);

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
    hasAnswer = true;
    var userAnswer = $('#answer').val();

    if (correctAnswer === parseInt(userAnswer)) {
        score += correctAnswer;
    } else {
        score -= correctAnswer;
        removeLife();
        updateLives();
    }
    updateScore();
    emptyAnswerInputBox();
    hideMaths();
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
    $('#lives').text("" + lives);
}

function updateStats() {
    updateLives();
    updateScore();
}

function emptyAnswerInputBox() {
    $('#answer').val("");
}

function showGame() {
    $('#scoreScreen').css("visibility", "visible");
}

function hideGame() {
    $('#scoreScreen').css("visibility", "hidden");
}

function hideMaths() {
    $('#mathsScreen').css("visibility", "hidden");
}

function showModal() {
    showFinalScore();
    $('#modalScreen').modal('show');
}

function hideModal() {
    $('#modalScreen').modal('hide');
}

function showFinalScore() {
    $('#finalScore').text("FINAL SCORE: " + score);
}
