$('#startBtn').click(function () {
    move('#startScreen')
        .set('margin-top', '0%')
        .duration('0.5s')
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
