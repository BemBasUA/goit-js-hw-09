const refs = {
  startBtn: document.querySelector(`[data-start]`),
  stopBtn: document.querySelector(`[data-stop]`),
  body: document.querySelector(`body`),
};

let intervalId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener(`click`, onStartBtnClick);

refs.stopBtn.addEventListener(`click`, onStopBtnClick);

function onStartBtnClick(e) {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStopBtnClick(e) {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
