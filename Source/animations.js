const headerText = document.querySelector(".htext");
const paragraphText = document.querySelector(".ptext");
const exploreButton = document.querySelector(".explore-button");

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

const videoElement = document.getElementById("video");
const videoSources = [
  "/Videos/VideoTemplate1.mp4",
  "/Videos/VideoTemplate2.mp4",
  "/Videos/VideoTemplate3.mp4",
];
const headerTexts = ["Skylines", "Supra", "Nissan"];
const paragraphTexts = ["GTR II Series", "A90 Release", "Z Series"];

let letAnimationPlay = true;
let currentCircle = document.getElementById("1");
let currentVideoIndex = 0;

function circlingAnimation(pathElement) {
  pathElement.classList.remove("stopped");
  pathElement.style.strokeDashoffset = "-97px";

  pathElement.addEventListener(
    "transitionend",
    async () => {
      if (currentCircle.id == "1") {
        changeVideo("2");
      } else if (currentCircle.id == "2") {
        changeVideo("3");
      } else if (currentCircle.id == "3") {
        pathElement.classList.add("stopped");
        letAnimationPlay = false;
      }
    },
    { once: true }
  );
}

function stopAnimation(pathElement) {
  pathElement.classList.add("stopped");
  pathElement.style.strokeDashoffset = "-48px";
}

async function textAnimation(newId, newCircle) {
  currentVideoIndex = parseInt(newId) - 1;
  currentCircle = newCircle;
  const newVideoSource = videoSources[currentVideoIndex];

  headerText.classList.remove("active-text");
  paragraphText.classList.remove("active-text");
  exploreButton.classList.remove("active-text");

  headerText.classList.add("inactive-text");
  paragraphText.classList.add("inactive-text");
  exploreButton.classList.add("inactive-text");

  videoElement.style.opacity = 0;

  headerText.addEventListener(
    "animationend",
    () => {
      videoElement.style.opacity = 1;
      headerText.textContent = headerTexts[currentVideoIndex];
      paragraphText.textContent = paragraphTexts[currentVideoIndex];
      videoElement.src = newVideoSource;
      videoElement.load();

      newCircle.classList.add("selected");
      newCircle.parentElement.lastElementChild.classList.add("default-transform");

      headerText.classList.remove("inactive-text");
      paragraphText.classList.remove("inactive-text");
      exploreButton.classList.remove("inactive-text");

      headerText.classList.add("active-text");
      paragraphText.classList.add("active-text");
      exploreButton.classList.add("active-text");

      videoElement.play();
    },
    { once: true }
  );
}

function changeVideo(newId) {
  const newCircle = document.getElementById(`${newId}`);
  if (currentCircle == newCircle) {
    return;
  }

  const currentPathElement =
    currentCircle.parentElement.lastElementChild.firstElementChild;
  const newPathElement =
    newCircle.parentElement.lastElementChild.firstElementChild;

  currentCircle.classList.remove("selected");
  currentPathElement.classList.remove("default-transform");

  if (letAnimationPlay) {
    stopAnimation(currentPathElement);
    circlingAnimation(newPathElement);
  } else {
    currentPathElement.style.strokeDashoffset = "-48px";
    newPathElement.style.strokeDashoffset = "-97px";
  }

  textAnimation(newId, newCircle);
}

document.addEventListener("DOMContentLoaded", () => {
  const pathElement = currentCircle.parentElement.lastElementChild;

  headerText.classList.add("active-text");
  paragraphText.classList.add("active-text");
  exploreButton.classList.add("active-text");
  currentCircle.classList.add("selected");
  pathElement.classList.toggle("default-transform");
  videoElement.style.opacity = 1;

  circlingAnimation(pathElement.firstElementChild);
  videoElement.play();
});