const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

// use webcam
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanavas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // lay ra
    let pixels = ctx.getImageData(0, 0, width, height);
    // gop. lai
    pixels = rqbSplit(pixels);
    // day vao
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // ?
  snap.currentTime = 0;
  snap.play();

  //   take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.textContent = "Download Image";
  link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
  strip.insertBefore(link, strip.firstChild);
  console.log(data);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; //r
    pixels.data[i + 1] = pixels.data[i + 0] - 50; //greenn
    pixels.data[i + 2] = pixels.data[i + 0] * 0.5; //blue
  }
  return pixels;
}

function rqbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //r
    pixels.data[i + 100] = pixels.data[i + 1]; //greenn
    pixels.data[i - 550] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanavas);
