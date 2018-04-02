$('#startBtn').click(function () {
    var startBtn = $('#startBtn');
    if (startBtn.text() === "START") {
        console.log("Start -> Restart");
        startGame();
    }
    move('#startScreen')
        .set('margin-top', '0%')
        .duration('0.5s')
        .end();
    startBtn.text("RESTART");
});


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

function moveDown() {
    // spawnNew();
    // move('#square')
    //     .y(100)
    //     .duration('0.5s')
    //     .ease('in')
    //     .then()
    //         .y(-20)
    //         .duration('0.2s')
    //         .ease('out')
    //         .then()
    //             .y(20)
    //             .duration('0.2s')
    //             .ease('in')
    //         .pop()
    //     .pop()
    //     .end();
    move('#mover')
        .add('margin-top', -100)
        .duration('0s')
        .then()
            .add('margin-top', 100)
            .duration('0.5s')
            .ease('in')
            .then()
                .add('margin-top', -20)
                .duration('0.2s')
                .ease('out')
                .then()
                    .add('margin-top', 20)
                    .duration('0.2s')
                    .ease('in')
                .pop()
            .pop()
        .pop()
        .end();
    spawnNew();
}

function spawnNew() {
    var node = document.createElement("div");
    node.id = "square";
    var doc = document.getElementById("squareHolder");
    if (Math.random() > 0.5) { // Placeholder visuals. The color should come from gameplay logic.
        node.style.backgroundColor = "red";
    } else {
        node.style.backgroundColor = "blue";
    }
    doc.insertBefore(node, document.getElementById("square"));
}
