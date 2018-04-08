if (annyang) {
    console.log("Annyang");
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
        'left': function () {
            moveLeft();
        },
        'right': function () {
            moveRight();
        }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
}

function startAnnyang() {
    if (annyang) {
        annyang.start({autoRestart: true, continuous: false});
    }
}

function stopAnnyang() {
    if (annyang) {
        annyang.pause();
    }
}