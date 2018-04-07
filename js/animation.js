const mathsScreenAnimation = 'animated bounceIn';
const movingSquareIndex = 3;
const maxSquareCount = 9;

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

function moveDown() {
    move('#mover')
        .set('margin-top', '-650px')
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
}

function moveLeft() { // Red side
    var current = squareList[movingSquareIndex];
    if (!current.classList.contains("square-red")) {
        removeLife();
        score -= 1;
    } else {
        score += 1;
    }
    updateScore();
    move(current)
        .set('transform', 'translateX(-20vw)')
        .ease('in')
        .duration('0.2s')
        .end();
    moveDown();
    console.log("moving left");
}

function moveRight() { // Blue side
    var current = squareList[movingSquareIndex];
    if (!current.classList.contains("square-blue")) {
        removeLife();
        score -= 1;
    } else {
        score += 1;
    }
    updateScore();
    move(current)
        .set('transform', 'translateX(20vw)')
        .ease('in')
        .duration('0.2s')
        .end();
    moveDown();
    console.log("moving right");
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