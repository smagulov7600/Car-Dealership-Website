const menuContainer = document.querySelector(".menu-container")
const menuBtn = document.querySelector(".menu-button")
const slideBar = document.querySelector(".slide")

menuContainer.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  slideBar.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});