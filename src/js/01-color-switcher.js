function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
    }, 1000);
});

refs.stopBtn.addEventListener("click", () => {
    refs.startBtn.disabled = false;
    clearInterval(timerId);
});
