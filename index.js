const navToggle = document.querySelector(".nav-toggle");
const navClosedIcon = document.querySelector("#navClosed");
const navOpenIcon = document.querySelector("#navOpen");
const navIcon = document.querySelectorAll(".navIcon");
const nav = document.querySelector(".navbar-nav");
const navbar = document.querySelector(".navbar");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  navbar.classList.toggle("border");
  navIcon.forEach((icon) => {
    icon.classList.toggle("hidden");
  });
});


window.addEventListener(
  "resize", () => {
    if (document.body.clientWidth > 768) {
      nav.classList.remove("open");
      navbar.classList.remove("border");
      navIcon.forEach((icon) => {
        icon.classList.remove("hidden");
      });
      navOpenIcon.classList.add("hidden");
    }
  },
  { passive: false }
);