window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
let notes = [];
let isRecording = false;
let startRecordDate;

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

    if (!key) return;

    if (!isRecording) {
        notRecordMode(keyCode, key, audio);
    } else {
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
        isRecording = true;
        notes = [];
        startRecordDate = Date.now();
    }
    else if (keyCode === 80) { // Call play function
        if (notes.length === 0) return;
        key.classList.add("playing");
        playSound(key);
    }
}

function recordMode(keyCode, key, audio) {

    if (!key) return;

    if (keyCode != 82 && keyCode != 80) {
        audio.play();
        key.dataset.clicked = "false";
        key.classList.remove("playing");
        notes.push({ key: keyCode,timeCode: Date.now() - startRecordDate });
        // console.log(notes);
    } 
    else if (keyCode === 82) {
        key.classList.remove("playing");
        isRecording = false;
    }
}

function playSound(key) {

    notes.forEach((note) => {
        const audio = document.querySelector(`audio[data-key='${note.key}']`);
        setTimeout(() => {
            audio.play();
        }, note.timeCode);
    });

    key.classList.remove("playing");
}
