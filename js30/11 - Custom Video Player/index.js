// get element
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
// function
function togglePlay() {
  //   if (video.paused) {
  //     video.play();
  //   } else video.pause();
  const method = video.paused ? "play" : "pause";
  //   console.log(method);
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "||";
  toggle.textContent = icon;
}

function ship() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  //   console.log(this.value);
  // this.name =  playbackRate speed || volume
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  //   console.log(percent);
}

function scrub(e) {
  const currentScrub = (e.offsetX / progress.offsetWidth) * video.duration;
  //   % * sum time video
  // progressBar update fl handleProgress function
  video.currentTime = currentScrub;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", ship));

ranges.forEach(ranges =>
  ranges.addEventListener("mousemove", handleRangeUpdate)
);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => moussedown && scrub(e));
// progress.addEventListener("mousedown", e => !mouseup && scrub(e));
progress.addEventListener("mousedown", () => (moussedown = true));
progress.addEventListener("mouseup", () => (moussedown = false));
