function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeMenu(slide, button, textclass) {
  document.querySelector(`.${slide}`).classList.toggle("open");
  document.querySelector(`.${button}`).classList.toggle("open");
  document.body.classList.toggle("no-scroll");

  const text = document.querySelector(`.${textclass}`);
  if (text.textContent == "Menu") {
    text.textContent = "Close";
  } else {
    text.textContent = "Menu";
  }
}

window.addEventListener("load", () => {
  document.querySelector(".htext").classList.add("active-text");
  document.querySelector(".ptext").classList.add("active-text");
  document.querySelector(".explore-button").classList.add("active-text");
});





async function circlingAnimation(pathElement) {
  setTimeout(() => {
    pathElement.style.strokeDashoffset = "-97px";
  }, 200);

  pathElement.addEventListener("transitionend", () => {
    changeVideo(currentCircle.id);
  });
}

function stopAnimation(pathElement) {
  pathElement.classList.add("stopped");
  pathElement.style.strokeDashoffset = "-48px";
}

let currentCircle = document.getElementById("1");

document.addEventListener("DOMContentLoaded", () => {
  circlingAnimation(
    currentCircle.parentElement.lastElementChild.firstElementChild
  );
});

const videoElement = document.getElementById("video");
const videoSources = [
  "/Videos/VideoTemplate1.mp4",
  "/Videos/VideoTemplate2.mp4",
  "/Videos/VideoTemplate3.mp4",
];
let currentVideoIndex = 0;

function changePlayingVideo() {
  const newVideoSource = videoSources[currentVideoIndex];

  videoElement.classList.add("fade-out");

  setTimeout(() => {
    videoElement.src = newVideoSource;
    videoElement.load();
    videoElement.play();
    videoElement.classList.remove("fade-out");
  }, 1000);
}

function changeVideo(newId) {
  const newCircle = document.getElementById(`${newId}`);
  if (currentCircle == newCircle) {
    return;
  }

  currentCircle.classList.remove("selected");
  newCircle.classList.add("selected");

  const currentPathElement =
    currentCircle.parentElement.lastElementChild.firstElementChild;
  const newPathElement =
    newCircle.parentElement.lastElementChild.firstElementChild;
  stopAnimation(currentPathElement);
  circlingAnimation(newPathElement);
  newPathElement.classList.remove("stopped");
  currentCircle = newCircle;

  currentVideoIndex = parseInt(newId) - 1;
  changePlayingVideo();
}

videoElement.play();