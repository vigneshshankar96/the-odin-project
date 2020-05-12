const carousel = document.querySelector(".carousel");
const slides = carousel.querySelectorAll(".slide");
const dotsContainer = carousel.querySelector(".dots-container");
const indexControlNextButton = carousel.querySelector(".index-control #next");
const indexControlPrevButton = carousel.querySelector(".index-control #prev");
const indexIndicatorText = carousel.querySelector(".index-indicator-text");
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener("click", (event) => setCurrentSlide(index));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("div.dot");
let currentIndex;

indexControlNextButton.onclick = (event) => progressSlide(+1);
indexControlPrevButton.onclick = (event) => progressSlide(-1);

function setCurrentSlide(newIndex) {
  if (currentIndex === newIndex) return;
  currentIndex = newIndex % slides.length;
  slides.forEach((slide, index) => {
    slide.classList.remove("show-slide");
  });
  slides[currentIndex].classList.add("show-slide");
  dots.forEach((dot, index) => {
    dot.classList.remove("active-dot");
  });
  dots[currentIndex].classList.add("active-dot");
  indexIndicatorText.textContent = `
    ${currentIndex + 1} / ${slides.length}
  `;
}

function progressSlide(step) {
  step %= slides.length;
  if (step < 0) step += slides.length;
  setCurrentSlide(currentIndex + step);
}

setCurrentSlide(0);
