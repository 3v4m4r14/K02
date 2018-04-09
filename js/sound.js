var successSound = new Audio('sound/success-short.wav');
var errorSound = new Audio('sound/error.wav');
var endSound = new Audio('sound/end.wav');
var mathsErrorSound = new Audio('sound/mathsError.wav');
var mathsSuccessSound = new Audio('sound/success.wav');
var backgroundMusic = new Audio('sound/underground.wav');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
backgroundMusic.play();

function changeBackgroundMusicStatus() {
    var musicOn = document.getElementById('musicOn');
    if (musicOn.checked) {
        unmuteBackgrounMusic();
    } else {
        muteBackgroundMusic();
    }
}

function changeSoundStatus() {
    var soundOn = document.getElementById('soundOn');
    if (soundOn.checked) {
        unmuteSounds();
    } else {
        muteSounds();
    }
}

function muteBackgroundMusic() {
    backgroundMusic.muted = true;
}

function unmuteBackgrounMusic() {
    backgroundMusic.muted = false;
}

function muteSounds() {
    successSound.muted = true;
    errorSound.muted = true;
    endSound.muted = true;
    mathsErrorSound.muted = true;
    mathsSuccessSound.muted = true;
}

function unmuteSounds() {
    successSound.muted = false;
    errorSound.muted = false;
    endSound.muted = false;
    mathsErrorSound.muted = false;
    mathsSuccessSound.muted = false;
}

function stopArrowSounds() {
    successSound.pause();
    successSound.currentTime = 0;
    errorSound.pause();
    errorSound.currentTime = 0;
    endSound.pause();
    endSound.currentTime = 0;
    mathsSuccessSound.pause();
    mathsSuccessSound.currentTime = 0;
    mathsErrorSound.pause();
    mathsErrorSound.currentTime = 0;
}

function playSuccessSound() {
    stopArrowSounds();
    successSound.play();
}

function playErrorSound() {
    stopArrowSounds();
    errorSound.play();
}

function playEndSound() {
    stopArrowSounds();
    endSound.play();
}

function playMathsErrorSound() {
    stopArrowSounds();
    mathsErrorSound.play();
}

function playMathsSuccessSound() {
    stopArrowSounds();
    mathsSuccessSound.play();
}