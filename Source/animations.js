const headerText = document.querySelector(".htext");
const paragraphText = document.querySelector(".ptext");
const exploreButton = document.querySelector(".explore-button");
const menuButton = document.querySelector(".menu-button");

function changeMenu() {
  document.querySelector(".slide").classList.toggle("open");
  document.querySelector(".menu-animation").classList.toggle("open");
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
let currentCircle = document.getElementById("Circle-1");
let currentVideoIndex = 0;

function circlingAnimation(pathElement) {
  pathElement.classList.remove("stopped");
  pathElement.style.strokeDashoffset = "-97px";

  pathElement.addEventListener(
    "transitionend",
    async () => {
      if (currentCircle.id == "Circle-1") {
        changeVideo("2");
      } else if (currentCircle.id == "Circle-2") {
        changeVideo("3");
      } else if (currentCircle.id == "Circle-3") {
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

      videoElement.play().catch((error) => {
        if (error.name === "AbortError") {
          console.log(
            "Playback was interrupted due to background restrictions."
          );
        } else {
          console.error("Video playback failed for another reason:", error);
        }
      });
    },
    { once: true }
  );
}

function changeVideo(newId) {
  const newCircle = document.getElementById(`Circle-${newId}`);
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

const navBar = document.querySelector(".nav-container");
const logo = navBar.children[0];
const contactUs = navBar.children[1];
const keyline = navBar.children[2];

const containerWrapper = document.querySelector(".container-wrapper");
const sections = document.querySelectorAll(".section");
const historySection = document.querySelector(".history");
const lifestyleSection = document.querySelector(".lifestyle");
const imageheroSection = document.querySelector(".image-hero");

function changeNavMenu(status) {
  if (status == true) {
    // Going down
    navBar.classList.remove("retract");
    navBar.classList.add("blur");
    menuButton.parentElement.classList.remove("retract2");
    menuButton.parentElement.classList.add("retract"); // Menu container
    logo.classList.add("retract"); // Logo container
    contactUs.classList.add("retract"); // Contact us button
    keyline.classList.add("retract");
  } else {
    // Going up
    navBar.classList.remove("blur");
    menuButton.parentElement.classList.remove("retract");
    logo.classList.remove("retract");
    contactUs.classList.remove("retract");
    keyline.classList.remove("retract");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pathElement = currentCircle.parentElement.lastElementChild;

  circlingAnimation(pathElement.firstElementChild);
  videoElement.play().catch((error) => {
    if (error.name === "AbortError") {
      console.log("Playback was interrupted due to background restrictions.");
    } else {
      console.error("Video playback failed for another reason:", error);
    }
  });

  containerWrapper.addEventListener("scroll", function () {
    if (!containerWrapper.classList.contains("no-scroll")) {
      containerWrapper.classList.add("no-scroll");
      setTimeout(function () {
        containerWrapper.classList.remove("no-scroll");
      }, 500);
    }
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          if (sectionId === "section2") {
            historySection.classList.add("slide-up");
            lifestyleSection.classList.add("slide-down");
            imageheroSection.classList.add("pop-up");
            changeNavMenu(true);
          } else if (sectionId === "section1") {
            historySection.classList.remove("slide-up");
            lifestyleSection.classList.remove("slide-down");
            imageheroSection.classList.remove("pop-up");
            changeNavMenu(false);
          } else if (sectionId === "section3") {
            navBar.classList.add("retract");
            menuButton.parentElement.classList.add("retract2");
          }
        }
      });
    },
    { threshold: 0.8 }
  );

  sections.forEach((section) => observer.observe(section));
});

const contacUsForm = document.querySelector(
  ".contact-us-form-validator-container"
);

function toggleContactUsFormMenu() {
  contacUsForm.classList.toggle("hidden");
}

function validateEmail(event) {
  let successMessage = "Success!";
  let errorMessage = "Invalid email";

  const email = document.getElementById("email").value;
  const statusMessage = document.querySelector(".status-message");

  let emailPattern = /\S+@\S+\.\S+/; // Simple email validation regex pattern
  if (!emailPattern.test(email)) {
    // Show Error
    statusMessage.textContent = errorMessage;
    statusMessage.classList.remove("success");
    statusMessage.classList.add("error");
    event.preventDefault(); // Prevent form submission
  } else {
    // Show Success
    statusMessage.textContent = successMessage;
    statusMessage.classList.remove("error");
    statusMessage.classList.add("success");
    event.preventDefault();
    // Proceed with form submission
  }
}