window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
let notes = [];
let isRecord = false;
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
  if (!isRecord) {
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
  } else if (keyCode === 82) {
    key.classList.add("playing");
    isRecord = true;
    notes = [];
    startRecordDate = Date.now();
  }
}

function recordMode(keyCode, key, audio) {
  if (!key) return;
  if (keyCode != 82 && keyCode != 80) {
    audio.play();
    key.dataset.clicked = "false";
    key.classList.remove("playing");
    notes.push({
      key: keyCode,
      timeCode: Date.now() - startRecordDate,
    });
    console.log(notes);
  } else if (keyCode === 82) {
    key.classList.remove("playing");
    isRecord = false;
  }
}

function playSound(index) {
 
//   const eventKeyDown = new KeyboardEvent("keydown", {keyCode: unKeyCode })
//   document.dispatchEvent(eventKeyDown);
}
