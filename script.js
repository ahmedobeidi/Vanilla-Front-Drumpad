document.addEventListener("keydown", handleKey);

function handleKey(event) {
    const keyCode = event.keyCode;
    const audio = document.querySelector(`audio[data-key = '${keyCode}']`);
    const key = document.querySelector(`.key[data-key = '${keyCode}']`);
    key.classList.add("playing");
    audio.play();
    setTimeout(() => {key.classList.remove("playing")}, 100);
}