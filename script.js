window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
let nots = [];
let isRecord = false;

function handleKeyDown(event) {
    const keyCode = event.keyCode;
    const key = document.querySelector(`.key[data-key='${keyCode}']`);
    const audio = document.querySelector(`audio[data-key='${keyCode}']`);
    if (!key) return;
    if (key.dataset.clicked === "true") return;
    key.dataset.clicked = "true";
    if (keyCode != 82 && keyCode != 80) {
        key.classList.add("playing");
        audio.currentTime = 0;
        audio.play();
    }
}

function handleKeyUp(event) {
    const keyCode = event.keyCode;
    const key = document.querySelector(`.key[data-key='${keyCode}']`);
    const audio = document.querySelector(`audio[data-key='${keyCode}']`);
    if (!isRecord) {
        notRecordMode(keyCode, key, audio);
    }
    else {
        recordMode(keyCode, key, audio);
    }
}

function notRecordMode(keyCode, key, audio) {
    if (!key) return;
    if (keyCode != 82 && keyCode != 80) {
        audio.play();
        key.dataset.clicked = "false";
        key.classList.remove("playing");
    } 
    else if (keyCode === 82) {
        key.classList.add("playing");
        isRecord = true;
        nots = [];
    }
}

function recordMode(keyCode, key, audio) {
    if (!key) return;
    if (keyCode != 82 && keyCode != 80) {
        audio.play();
        key.dataset.clicked = "false";
        key.classList.remove("playing");
        nots.push(audio);
        console.log(nots);
    } 
    else if (keyCode === 82) {
        key.classList.remove("playing");
        isRecord = false;
        console.log(nots);
    }
}