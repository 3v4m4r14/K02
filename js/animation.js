$('#startBtn').click(function () {
    console.log("YOLO");
    move('#startScreen')
        .to(500, 200)
        .end();
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
