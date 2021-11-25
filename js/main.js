/*  ########## SELECTORS ########## */
const videoControl = document.querySelector(".header__video--controls");
const headerVideo = document.querySelector(".header__video--content");
const nav = document.querySelector(".navigation");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn-left");
const sliderBtnRight = document.querySelector(".slider__btn-right");
const newsContainer = document.querySelector(".news");
const news = document.querySelectorAll(".news__new");
const modals = document.querySelectorAll(".modal");

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

/*  ########## Smooth scroll ########## */
document
  .querySelector(".navigation__list")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("navigation__list--link")) {
      const id = e.target.getAttribute(`href`);
      document.querySelector(id).scrollIntoView({ behavior: `smooth` });
    }
  });

/*  ########## Open/Close modal ########## */
const modalWindow = function (data) {
  modals.forEach(function (m) {
    if (m.dataset.news === data) {
      m.style.display = "block";
    }
  });
};

newsContainer.addEventListener("click", function (e) {
  let data;
  if (e.target.classList.contains("news__new")) {
    data = e.target.dataset.news;
  }
  modalWindow(data);
});

const closeModal = function (e) {
  if (e.target.classList.contains("modal__window--close")) {
    e.target.closest(".modal").style.display = "none";
  }
};

modals.forEach((m) => m.addEventListener("click", closeModal));

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modals.forEach((m) => (m.style.display = "none"));
  }
});
