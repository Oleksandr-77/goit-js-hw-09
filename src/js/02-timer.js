
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  datetimePicker: document.querySelectorAll('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {

  if (selectedDates < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
  } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
      startCountdown(selectedDates);
      });
  }
  },
});

function startCountdown(selectedDates) {

  const countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const differenceInMs = Math.floor(selectedDates - currentDate);
      const formatedDifferenceInMs = convertMs(differenceInMs);

      if (differenceInMs <= 0) {
          clearInterval(countdownInterval);
          resetValues();

      } else {
          populateValues(formatedDifferenceInMs)
      }
  }, 1000);
};
function populateValues(formatedDifferenceInMs) {
  refs.secondsEl.textContent = formatedDifferenceInMs.seconds.toString().padStart(2, '0');
  refs.minutesEl.textContent = formatedDifferenceInMs.minutes.toString().padStart(2, '0');
  refs.hoursEl.textContent = formatedDifferenceInMs.hours.toString().padStart(2, '0');
  refs.daysEl.textContent = formatedDifferenceInMs.days.toString().padStart(2, '0');
};

function resetValues() {
  refs.daysEl.textContent = '00';
  refs.hoursEl.textContent = '00';
  refs.minutesEl.textContent = '00';
  refs.secondsEl.textContent = '00';
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
