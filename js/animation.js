const mathsScreenAnimation = 'animated bounceIn';
const movingSquareIndex = 3;
const maxSquareCount = 9;
const glowInterval = 700;

var moverTimer = 10000;
var moveInterval;
var glowIntervalObject;
var glowTimeoutObject;


var squareList = [];
$('#startBtn').click(function () {
    var startBtn = $('#startBtn');
    if (startBtn.text() === "START") {
        console.log("Start -> Restart");
        startBtn.text("RESTART");
        // move('#startScreen')
        //     .set('margin-top', '0%')
        //     .duration('0.5s')
        //     .end();
    }
    startGame();
});

function clearMoveTimer() {
    clearInterval(moveInterval);
}

function restartMoveTimer() {
    clearMoveTimer();
    moveInterval = setInterval(function() {
        animateMoveToSide(squareList[movingSquareIndex], 0, false);
        moveDown();
        removeLife();
        playErrorSound();
    }, moverTimer);
}

function moveDown() {
    move('#mover')
        .set('margin-top', '-720px')
        .duration('0s')
        .then()
            .add('margin-top', 100)
            .duration('0.3s')
            .ease('in')
            .then()
                .add('margin-top', -5)
                .duration('0.05s')
                .ease('out')
                .then()
                    .add('margin-top', 5)
                    .duration('0.05s')
                    .ease('in')
                .pop()
            .pop()
        .pop()
        .end();
    spawnNew();
    clearSquaresOverflow();
    restartMoveTimer();
    resetSquareProgressBar();
}

function glowArrows() {
    clearInterval(glowIntervalObject);
    clearTimeout(glowTimeoutObject);
    move('#leftBtn')
        .set('-webkit-filter', 'drop-shadow(0 0 20px var(--red))')
        .set('filter', 'drop-shadow(0 0 20px var(--red))')
        .set('border-right', '25px solid var(--red)')
        .duration(glowInterval)
        .end();
    move('#rightBtn')
        .set('-webkit-filter', 'drop-shadow(0 0 20px var(--blue))')
        .set('filter', 'drop-shadow(0 0 20px var(--blue))')
        .set('border-left', '25px solid var(--blue)')
        .duration(glowInterval)
        .end();
    
    glowIntervalObject = setInterval(function(){
        move('#leftBtn')
            .set('-webkit-filter', 'drop-shadow(0 0 10px var(--dark-red))')
            .set('filter', 'drop-shadow(0 0 10px var(--dark-red))')
            .set('border-right', '25px solid var(--dark-red)')
            .duration(glowInterval * 0.5)
        .end();
        move('#rightBtn')
            .set('-webkit-filter', 'drop-shadow(0 0 10px var(--dark-blue))')
            .set('filter', 'drop-shadow(0 0 10px var(--dark-blue))')
            .set('border-left', '25px solid var(--dark-blue)')
            .duration(glowInterval * 0.5)
            .end();

        glowTimeoutObject = setTimeout(function(){
            move('#leftBtn')
                .set('-webkit-filter', 'drop-shadow(0 0 20px var(--red))')
                .set('filter', 'drop-shadow(0 0 20px var(--red))')
                .set('border-right', '25px solid var(--red)')
                .duration(glowInterval * 0.5)
                .end();
            move('#rightBtn')
                .set('-webkit-filter', 'drop-shadow(0 0 20px var(--blue))')
                .set('filter', 'drop-shadow(0 0 20px var(--blue))')
                .set('border-left', '25px solid var(--blue)')
                .duration(glowInterval * 0.5)
                .end();
        }, glowInterval * 0.5);
    }, glowInterval);
}

function resetSquareProgressBar() {
    moverTimer -= 10;
    move('#squareProgressBar')
        .set('width', '100%')
        .duration('0s')
        .then()
            .set('width', '0%')
            .duration(moverTimer)
            .ease('linear')
        .pop()
        .end()
}

function moveLeft() { // Red side
    resetSquareProgressBar();
    var current = squareList[movingSquareIndex];
    var isCorrect = false;
    if (!current.classList.contains("square-red")) {
        removeLife();
        score -= 1;
        playErrorSound();
    } else {
        isCorrect = true;
        score += 1;
        playSuccessSound();
    }
    updateScore();
    animateMoveToSide(current, -20, isCorrect);
    moveDown();
}

function moveRight() { // Blue side
    resetSquareProgressBar();
    var current = squareList[movingSquareIndex];
    var isCorrect = false;
    if (!current.classList.contains("square-blue")) {
        removeLife();
        score -= 1;
        playErrorSound();
    } else {
        isCorrect = true;
        score += 1;
        playSuccessSound();
    }
    updateScore();
    animateMoveToSide(current, 20, isCorrect);
    moveDown();
}

function animateMoveToSide(element, amount, isCorrect) {
    if (isCorrect) {
        var color = 'var(--red)';
        if (element.classList.contains("square-blue")) {
            color = 'var(--blue)';
        }
        console.log(color);
        move(element)
            .set('transform', 'translateX(' + amount + 'vw)')
            .ease('in')
            .duration('0.2s')
            .then()
                .set('background-color', color)
                .set('-webkit-filter', 'drop-shadow(0 0 15px ' + color + ')')
                .set('filter', 'drop-shadow(0 0 15px ' + color + ')')
                .set('z-index', 2)
                .duration('0.3s')
                .ease('in')
            .pop()
            .end();
    } else {
        var x = Math.random() * 50 - 25;
        var y = Math.random() * 50 - 25;
        move(element)
            .set('transform', 'translateX(' + amount + 'vw)')
            .ease('in')
            .duration('0.2s')
            .then()
                .set('background-color', 'var(--purple)')
                .set('-webkit-filter', 'drop-shadow(0 0 15px var(--purple))')
                .set('filter', 'drop-shadow(0 0 15px var(--purple))')
                .duration('0.5s')
                .ease('out')
                .then()
                    .set('background-color', 'transparent')
                    .set('-webkit-filter', 'drop-shadow(0 0 0 transparent)')
                    .set('filter', 'drop-shadow(0 0 0 transparent)')
                    .scale(2)
                    .x(amount * 5 + x)
                    .y(y)
                    .duration('0.5s')
                .pop()
            .pop()
            .end();
    }
}

function clearSquares() {
    var holder = document.getElementById("squareHolder");
    squareList.forEach(element => {
        holder.removeChild(element);
    });
    squareList = [];
}

function clearSquaresOverflow() {
    var holder = document.getElementById("squareHolder");
    while (squareList.length > maxSquareCount) {
        holder.removeChild(squareList.pop(maxSquareCount));
    }
}

function spawnNew() {
    var node = document.createElement("div");
    squareList.unshift(node);
    node.classList.add("square");
    var doc = document.getElementById("squareHolder");
    if (Math.random() > 0.5) {
        node.classList.add("square-red");
    } else {
        node.classList.add("square-blue");
    }
    doc.insertBefore(node, document.getElementsByClassName("square")[0]);
}

function wobblyMaths() {
    var mathsScreen = $('#mathsScreen');
    mathsScreen.removeClass(mathsScreenAnimation);

    setTimeout(function () {
        mathsScreen.addClass(mathsScreenAnimation);
    }, 10);
    console.log("wobbling!");
}

function flashingLife(curLife) {
    var lifeLossAnimation = 'animated flash';
    curLife.removeClass(lifeLossAnimation);

    setTimeout(function () {
        curLife.addClass(lifeLossAnimation);
    }, 10);
    console.log("flashing!");
}

function pulsingStart() {
    var startBtnAnimation = 'animated pulse';
    var startBtn = $('#startBtn');
    startBtn.removeClass(startBtnAnimation);

    setTimeout(function () {
        startBtn.addClass(startBtnAnimation);
    }, 50);
    console.log("pulsing!");
}