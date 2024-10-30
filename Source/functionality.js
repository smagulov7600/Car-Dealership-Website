const menuBtn = document.querySelector(".nav-menu-button")
const slideBar = document.querySelector(".slide")

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  slideBar.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});