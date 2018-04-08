var successSound = new Audio('sound/success.wav');
var errorSound = new Audio('sound/error.wav');
var endSound = new Audio('sound/end.wav');

function stopAllSounds() {
    successSound.pause();
    successSound.currentTime = 0;
    errorSound.pause();
    errorSound.currentTime = 0;
    endSound.pause();
    endSound.currentTime = 0;
}

function playSuccessSound() {
    stopAllSounds();
    successSound.play();
}

function playErrorSound() {
    stopAllSounds();
    errorSound.play();
}

function playEndSound() {
    stopAllSounds();
    endSound.play();
}