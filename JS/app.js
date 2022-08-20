/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 */
const sections = document.querySelectorAll("section");
const mainUl = document.getElementById("navbar__list");
const pageHeader = document.querySelector(".page__header");
// For up bottun
const span = document.querySelector(".up");
// For performance
const fragment = document.createDocumentFragment();
/**
 * End Global Variables
 * Begin Main Functions
 * Make smoothy behavior on click event
 * Using setTimeout to make more smoothy behavior
 */
const createNavChilds = function () {
  for (const section of sections) {
    const sectionId = section.getAttribute("id");
    const sectionName = section.getAttribute("data-nav");
    // Build nav childs => (li & a)
    const list = document.createElement("li");
    list.innerHTML = `<a href = "#${sectionId}" class = "menu__link">${sectionName}</a>`;

    // For smoothy scrolling
    list.addEventListener("click", (go) => {
      go.preventDefault();
      document.getElementById(`${sectionId}`).scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        location.hash = `${sectionId}`;
      }, 800);
    });
    fragment.appendChild(list);
  }
  mainUl.appendChild(fragment);
};
createNavChilds();

/**
 * End Main Functions
 * Set sections & links as active
 * Checking for condition
 * Start condition
 */
window.onscroll = function () {
  sections.forEach(function (section) {
    // console.log(section.getBoundingClientRect().top);

    const linkActive = document.querySelector(
      `.menu__link[href = "#${section.getAttribute("id")}"]`
    );
    if (
      section.getBoundingClientRect().top <= 150 &&
      section.getBoundingClientRect().top >= -430
    ) {
      section.classList.add("your-active-class");
      linkActive.classList.add("link__active");
    } else {
      section.classList.remove("your-active-class");
      linkActive.classList.remove("link__active");
    }
  });

  // Create button scroll to top
  if (window.scrollY >= 700) {
    span.classList.add("show");
  } else {
    span.classList.remove("show");
  }
  span.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Hide the header while un scrolling
// Creat clearTimeout to make setTimeout function do one a time (every scroll)
let scrolling;
document.onscroll = () => {
  document.querySelector("header").style.display = "block";
  clearTimeout(scrolling);
      scrolling = setTimeout(() => {
    document.querySelector("header").style.display = "none";
  }, 4000);
};
// create icons click to make lists visable (for responsive)
// Then creat closing click
const icons = document.querySelector(".icons");
const closingIcons = document.querySelector(".icons-click");

icons.addEventListener("click", () => {
  icons.style.display = "none";
  closingIcons.style.display = "block";
  mainUl.id = "open";
});
closingIcons.addEventListener("click", () => {
  icons.style.display = "flex";
  closingIcons.style.display = "none";
  mainUl.id = "navbar__list";
});
