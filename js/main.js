/*  ########## SELECTORS ########## */
const videoControl = document.querySelector(".header__video--controls");
const headerVideo = document.querySelector(".header__video--content");
const nav = document.querySelector(".navigation");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const slides = document.querySelectorAll(".slider__slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const storiesContainer = document.querySelector(".stories__container");
const stories = document.querySelectorAll(".stories__story");
const allImages = document.querySelectorAll("img");
const lines = document.querySelectorAll(".latest-product__line");
const navBtn = document.querySelector(".navigation__btn");
const navBtnContent = document.querySelector(".navigation__btn-body");
const navList = document.querySelector(".navigation__list");
const copyright = document.querySelector(".footer__copyright");
const footer = document.querySelector(".footer");

/*  ########## Start/Stop header video ########## */
let playState = true;

videoControl.addEventListener("click", function () {
  if (playState) {
    videoControl.classList.toggle("icon-music-play-button");
    headerVideo.pause();
    playState = !playState;
  } else if (!playState) {
    videoControl.classList.toggle("icon-music-play-button");
    headerVideo.play();
    playState = !playState;
  }
});

/*  ########## Fixed navigation ########## */
const navigationFixed = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("navigation--fixed");
  else nav.classList.remove("navigation--fixed");
};

const headerObserver = new IntersectionObserver(navigationFixed, {
  root: null,
  threshold: 0.5,
});

headerObserver.observe(header);

/*  ########## Reveal section on scroll ########## */
const sectionReveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/*  ########## Products slider ########## */
const maxSlide = slides.length;
let activeSlide = 0;

const setActiveSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}vw)`)
  );
};

setActiveSlide(0);

const nextSlide = function () {
  activeSlide === maxSlide - 1 ? (activeSlide = 0) : activeSlide++;
  setActiveSlide(activeSlide);
};

const prevSlide = function () {
  activeSlide === 0 ? (activeSlide = maxSlide - 1) : activeSlide--;
  setActiveSlide(activeSlide);
};

sliderBtnRight.addEventListener("click", nextSlide);
sliderBtnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});
/*  ########## Toggle navigation ########## */
let navToggled = false;

const toggleNav = function () {
  if (!navToggled) {
    navList.classList.add("toggled");
    navBtnContent.classList.add("toggled");
    navToggled = !navToggled;
  } else {
    navList.classList.remove("toggled");
    navBtnContent.classList.remove("toggled");
    navToggled = !navToggled;
  }
};

navBtn.addEventListener("click", toggleNav);

document.addEventListener("keydown", function () {
  if (navToggled) {
    navList.classList.remove("toggled");
    navBtnContent.classList.remove("toggled");
    navToggled = !navToggled;
  }
});

/*  ########## Smooth scroll navigation ########## */
document
  .querySelector(".navigation__list")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("navigation__list--link")) {
      const id = e.target.getAttribute(`href`);
      document.querySelector(id).scrollIntoView({ behavior: `smooth` });
      toggleNav();
    }
  });

/*  ########## Smooth scroll footer ########## */
document.querySelector(".footer").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("footer__link")) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

/*  ########## Story scroll into view ########## */
storiesContainer.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("stories__image")) {
    e.target.scrollIntoView({ behavior: "smooth" });
  }

  return;
});

/*  ########## Disable image dragging ########## */
allImages.forEach((img) => img.setAttribute("draggable", false));

/*  ########## Reveal lines ########## */
const revealLines = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("line--hidden");
  observer.unobserve(entry.target);
};

const lineObserver = new IntersectionObserver(revealLines, {
  root: null,
  threshold: 0,
});

lines.forEach(function (line) {
  lineObserver.observe(line);
  line.classList.add("line--hidden");
});

/*  ########## Copyright ########## */
const setCopyright = function () {
  const date = new Date().getFullYear();
  copyright.textContent = `\u00A9 all rights reserved to damian rives ${date}`;
};
setCopyright();

/*  ########## Smoothscroll from header ########## */
document.querySelector(".header__cta").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".collection").scrollIntoView({ behavior: "smooth" });
});

/*  ########## Lazy loading images ########## */

// !!! Grid causing problem with proper image loading !!!

// const imgTargets = document.querySelectorAll("img[data-src]");

// const switchImages = function (entries, observer) {
//   const [entry] = entries;
//   entry.target.src = entry.target.dataset.src;
// };

// const imgObserver = new IntersectionObserver(switchImages, {
//   root: null,
//   threshold: 0,
//   rootMargin: "200px",
// });

// imgTargets.forEach((img) => {
//   imgObserver.observe(img);
// });
