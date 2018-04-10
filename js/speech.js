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

function isChrome() {
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        return true;
    } else if (isChromium !== null &&
               typeof isChromium !== "undefined" &&
               vendorName === "Google Inc." &&
               isOpera === false &&
               isIEedge === false) {
        $('#speechInfo').css("visibility", "visible");
    } else {
        $('#speechInfo').css("visibility", "hidden");
    }
}