var lives = 3;
var score = 0;
var correctAnswer;
var taskInterval = null;
var hasAnswer = false;
var extraTaskIsActive = false;
window.onkeydown = chooseKeyAction;
$('#leftBtn').click(function () {
    moveLeft();
});
$('#rightBtn').click(function () {
    moveRight();
});
$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
});

function startGame() {
    lives = 200;
    score = 0;
    correctAnswer = getRandomMathOperation();
    updateStats();
    showGame();
    hideEndModal();
    restartExtraTaskInterval();
    clearSquares();
    for (i = 0; i < 4; i++) {
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
    clearSquares();
    showEndModal();
}

function extraTask() {
    showMaths();
    setTimeout(function () {
        if (!hasAnswer) {
            removeLife();
        }
        setTimeout(function () {
            emptyAnswerInputBox();
            correctAnswer = getRandomMathOperation();
        }, 1000);
        hasAnswer = false;
    }, 5500);
}

function extraTaskInterval() {
    return setInterval(function () {
        extraTask();
    }, 100000);
}

function clearExtraTaskInterval() {
    clearInterval(taskInterval);
}

function restartExtraTaskInterval() {
    clearExtraTaskInterval();
    taskInterval = extraTaskInterval();
    console.log("restarted interval");
}

function removeLife() {
    if (lives > 0) {
        lives--;
    }
    updateLives();
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
    }
    updateScore();
    emptyAnswerInputBox();
    hideMaths();
    correctAnswer = getRandomMathOperation();
}

function chooseKeyAction(e) {
    e = e || window.event;
    if (!extraTaskIsActive && e.key === "ArrowLeft") {
        moveLeft();
    } else if (!extraTaskIsActive && e.key === "ArrowRight") {
        moveRight();
    } else if (extraTaskIsActive && e.key === "Enter") {
        e.preventDefault();
        checkAnswer();
    } else if (e.key === "Enter") {
        e.preventDefault();
    }
}

function updateScore() {
    $('#score').text("" + score);
}

function updateLives() {
    if (lives <= 3) {
        var curLife = $('#life' + (lives + 1));
        flashingLife(curLife);
        curLife.attr('src', 'pic/heart-empty.png');
    }
}

function resetLifeImages() {
    var lives = $('.heart');
    console.log(lives);
    for (var i = 0; i < lives.length; i++) {
        console.log(lives[i]);
        lives[i].src = 'pic/heart-full.png';
    }
}

function updateStats() {
    updateLives();
    updateScore();
    resetLifeImages();
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

function showEndModal() {
    showFinalScore();
    $('#endModalScreen').modal('show');
}

function hideEndModal() {
    $('#endModalScreen').modal('hide');
}

function hideMaths() {
    $('#mathsScreen').modal('hide');
    $('#mathsProgressBar').css('width', '100%');
    extraTaskIsActive = false;
    console.log("INACTIVE");
}

function showMaths() {
    extraTaskIsActive = true;
    console.log("ACTIVE");
    mathsCountdown();
    wobblyMaths();
    $('#mathsScreen').modal('show');
}

function showFinalScore() {
    $('#finalScore').text("FINAL SCORE: " + score);
}

function mathsCountdown() {
    var mathsProgressBar = $('#mathsProgressBar');
    var time = 50;
    var max = 50;
    int = setInterval(function () {
        mathsProgressBar.css('width', Math.floor(100 * time-- / max) + '%');
        if (time - 1 === -6) {
            console.log("Breaking!");
            clearInterval(int);
            hideMaths();
        }
    }, 100);
}