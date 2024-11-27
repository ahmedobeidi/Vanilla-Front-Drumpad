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
        playSound(80);  
        key.classList.remove("playing");
    }
}

function recordMode(keyCode, key, audio) {

    if (!key) return;

    if (keyCode != 82 && keyCode != 80) {
        audio.play();
        key.dataset.clicked = "false";
        key.classList.remove("playing");
        notes.push({ key: keyCode,timeCode: Date.now() - startRecordDate });
    } 
    else if (keyCode === 82) {
        key.classList.remove("playing");
        isRecording = false;
    }
}

function playSound(keyCode) {

    notes.forEach((note) => {

        setTimeout(() => {

            const keyBoardDownEvent = new KeyboardEvent("keydown", { keyCode: note.key });
            const keyBoardUpEvent = new KeyboardEvent("keyup", { keyCode: note.key });
            const audio = document.querySelector(`audio[data-key='${note.key}']`);
            const key = document.querySelector(`.key[data-key='${note.key}']`);
            
            document.dispatchEvent(keyBoardUpEvent);

            audio.currentTime = 0;
            audio.play();

            setTimeout(() => {
                key.classList.add("playing");
                document.dispatchEvent(keyBoardDownEvent);
                
            }, 300);

            setTimeout(() => {
                key.classList.remove("playing");
            }, 413);
            
            
        }, note.timeCode);  
       
    });
}
