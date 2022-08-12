import Notiflix from 'notiflix';

const refs = {
  firstDelay: document.querySelector(`[name="delay"]`),
  delayStep: document.querySelector(`[name="step"]`),
  amount: document.querySelector(`[name="amount"]`),
  form: document.querySelector(`.form`),
};

let firstDelay = 0;

let delayStep = 0;

let amount = 0;

refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  firstDelay = Number(refs.firstDelay.value);
  delayStep = Number(refs.delayStep.value);
  amount = refs.amount.value;
  let delay = firstDelay;
  for (let i = 1; i <= amount; i++) {
    const position = i;
    if (i > 1) {
      delay += delayStep;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
