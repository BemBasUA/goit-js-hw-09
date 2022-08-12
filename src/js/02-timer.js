import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector(`#datetime-picker`),
  startBtn: document.querySelector(`[data-start]`),
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDatePick(selectedDates);
  },
};

let UnixTimeDifference = 0;

refs.startBtn.addEventListener(`click`, onStartBtnClick);

refs.startBtn.disabled = true;

flatpickr(refs.input, options);

function onDatePick(selectedDates) {
  if (selectedDates[0].getTime() <= Date.now()) {
    Notiflix.Notify.failure(`Please choose a date in the future`);
    refs.startBtn.disabled = true;
    return;
  }
  refs.startBtn.disabled = false;
  setInterval(() => {
    UnixTimeDifference = selectedDates[0].getTime() - Date.now();
    return UnixTimeDifference;
  }, 1000);
}

function onStartBtnClick() {
  setInterval(() => {
    if (UnixTimeDifference > 0) {
      let timeDifference = convertMs(UnixTimeDifference);
      let days = addLeadingZero(timeDifference.days);
      let hours = addLeadingZero(timeDifference.hours);
      let minutes = addLeadingZero(timeDifference.minutes);
      let seconds = addLeadingZero(timeDifference.seconds);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}
