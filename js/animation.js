const mathsScreenAnimation = 'animated bounceIn';
const maxSquareCount = 8;
var movingSquareIndex = 3;
var leftArrow = document.getElementById("leftBtn");
var rightArrow = document.getElementById("rightBtn");

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

function pushDown() {
    if (movingSquareIndex == maxSquareCount - 1) {
        removeLife()
    }
    if (lives > 0) {
        moveDown();
    }
}

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
    if (movingSquareIndex < maxSquareCount - 1) {
        movingSquareIndex++;
    }
    updateArrows();
    restartSquarePusher();
}

function updateArrows() {
    var row = squareList[movingSquareIndex];
    row.insertBefore(leftArrow, row.firstChild);
    row.appendChild(rightArrow);
}

function explosionPiece() {
    var node = document.createElement("div");
    node.classList.add("explosion");
    var parent = document.getElementById("explosion");
    parent.appendChild(node);
    var x = Math.random() * 10;
    var y = Math.random() * 10;
    move(node)
        .set('transform', 'translate(0vw, 0vw)')
        .duration('0s')
        .then()
            .set('transform', 'translate(' + x + 'vw, ' + y + 'vw)')
            .ease('out')
            .duration('0.3s')
        .pop()
        .end();
    setTimeout(function () {
        parent.removeChild(node);
    }, 350);
}

function moveLeft() { // Red side
    var current = squareList[movingSquareIndex].getElementsByClassName("square")[0];
    movingSquareIndex--;
    if (!current.classList.contains("square-red")) {
        removeLife();
        score -= 1;
    } else {
        score += 1;
    }
    updateScore();
    updateArrows();
    move(current)
        .set('transform', 'translateX(-20vw)')
        .ease('in')
        .duration('0.2s')
        .end();
    if (movingSquareIndex < 3) moveDown();
    console.log("moving left");
}

function moveRight() { // Blue side
    var current = squareList[movingSquareIndex].getElementsByClassName("square")[0];
    movingSquareIndex--;
    if (!current.classList.contains("square-blue")) {
        removeLife();
        score -= 1;
    } else {
        score += 1;
    }
    updateScore();
    updateArrows();
    move(current)
        .set('transform', 'translateX(20vw)')
        .ease('in')
        .duration('0.2s')
        .end();
    if (movingSquareIndex < 3) moveDown();
    console.log("moving right");
}

function clearSquares() {
    movingSquareIndex = 3;
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
    var squareRow = document.createElement("div");
    var node = document.createElement("div");
    squareRow.classList.add("square-row", "row");
    node.classList.add("square");
    var doc = document.getElementById("squareHolder");
    if (Math.random() > 0.5) {
        node.classList.add("square-red");
    } else {
        node.classList.add("square-blue");
    }
    doc.insertBefore(squareRow, squareList[0]);
    squareRow.appendChild(node);
    squareList.unshift(squareRow);
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