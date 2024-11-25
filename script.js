document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);


function handleKeyDown(event) {
    const keyCode = event.keyCode;
    const key = document.querySelector(`.key[data-key='${keyCode}']`);
    const audio = document.querySelector(`audio[data-key='${keyCode}']`);
    // const keyClicked = document.querySelector(`.key[data-clicked="true"]`);
    if (key.dataset.clicked === "true") return;
    key.dataset.clicked = "true";
    if (!key) return;
    console.log(key);
    key.classList.add("playing");
    audio.play();
}

function handleKeyUp(event) {
    const keyCode = event.keyCode;
    const key = document.querySelector(`.key[data-key='${keyCode}']`);
    if (!key) return;
    key.classList.remove("playing");
    key.dataset.clicked = "false";
    
}