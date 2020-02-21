let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");

function time(secounds) {
  const now = Date.now();
  const then = now + secounds * 1000;
  displayEndTime(then);
  displayTimeLeft(secounds);
  countdown = setInterval(() => {
    const secoundsLeft = Math.round((then - Date.now()) / 1000);

    if (secoundsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secoundsLeft);
    console.log(secoundsLeft);
  }, 1000);
}

function displayTimeLeft(secounds) {
  const minute = Math.floor(secounds / 60);
  const remainderSeconds = secounds % 60;
  const display = `${minute}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timeDisplay.textContent = display;
}

function displayEndTime(timesTamp) {
  const end = new Date(timesTamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be Black At ${
    hour > 12 ? hour - 12 : hour
  }:${minutes}`;
}

document.querySelectorAll("[data-time]").forEach(b =>
  b.addEventListener("click", e => {
    clearInterval(countdown);
    time(e.target.dataset.time);
  })
);

document.customForm.addEventListener("submit", e => {
  e.preventDefault();
  clearInterval(countdown);
  time(e.target.minutes.value);
  e.target.reset();
});
