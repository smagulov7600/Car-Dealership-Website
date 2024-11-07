const headerText = document.querySelector(".htext");
const paragraphText = document.querySelector(".ptext");
const exploreButton = document.querySelector(".explore-button");
const menuButton = document.querySelector(".menu-button");

function changeMenu() {
  document.querySelector(".slide").classList.toggle("open");
  menuButton.firstElementChild.classList.toggle("open");
  document.querySelector(".container-wrapper").classList.toggle("no-scroll");

  const text = menuButton.lastElementChild;
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
      newCircle.parentElement.lastElementChild.classList.add(
        "default-transform"
      );

      headerText.classList.remove("inactive-text");
      paragraphText.classList.remove("inactive-text");
      exploreButton.classList.remove("inactive-text");

      headerText.classList.add("active-text");
      paragraphText.classList.add("active-text");
      exploreButton.classList.add("active-text");

      try {
        videoElement.play();
      } catch (error) {
        console.error("Error occurred while trying to play the video:", error);
      }
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
  currentPathElement.parentElement.classList.remove("default-transform");

  if (letAnimationPlay) {
    stopAnimation(currentPathElement);
    circlingAnimation(newPathElement);
  } else {
    currentPathElement.style.strokeDashoffset = "-48px";
    newPathElement.style.strokeDashoffset = "-97px";
  }

  textAnimation(newId, newCircle);
}

let lastScrollY = window.scrollY;
const navBar = document.querySelector(".nav-container");
window.addEventListener("scroll", function () {
  let currentScrollY = window.scrollY;

  if ((currentScrollY > lastScrollY) & !navBar.classList.contains("active")) {
    // Scrolling down
    navBar.classList.remove("active");
    menuBar.classList.remove("active");
  } else if (
    (currentScrollY < lastScrollY) &
    navBar.classList.contains("active")
  ) {
    // Scrolling up
    navBar.classList.add("active");
    menuBar.classList.add("active");
  }

  lastScrollY = currentScrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  const pathElement = currentCircle.parentElement.lastElementChild;

  circlingAnimation(pathElement.firstElementChild);
  try {
    videoElement.play();
  } catch (error) {
    console.error("Error occurred while trying to play the video:", error);
  }
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes when element is in view
        if (entry.target.classList.contains("history")) {
          entry.target.classList.add("slide-up");
        } else if (entry.target.classList.contains("lifestyle")) {
          entry.target.classList.add("slide-down");
        }
      } else {
        // Remove animation classes when element goes out of view
        entry.target.classList.remove("slide-down", "slide-up");
      }
    });
  }, observerOptions);

  // Observe the target elements
  const historySection = document.querySelector(".history");
  const lifestyleSection = document.querySelector(".lifestyle");

  if (historySection) observer.observe(historySection);
  if (lifestyleSection) observer.observe(lifestyleSection);
});
