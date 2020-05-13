const CAROUSEL_TAG = "pt-carousel";
const SLIDE_TAG = "pt-slide";

const CarouselFactory = (carouselElement) => {
  const slideChangeInterval = !carouselElement.getAttribute("msTimeInterval")
    ? "4000" // default time interval for automatic slides switches
    : carouselElement.getAttribute("msTimeInterval");
  let myTimer;
  startAutoCarousel();

  const slides = carouselElement.querySelectorAll(SLIDE_TAG);

  const indexControl = document.createElement("div");
  const indexControlPrevButton = document.createElement("button");
  const indexIndicatorText = document.createElement("span");
  const indexControlNextButton = document.createElement("button");
  const dotsContainer = document.createElement("div");

  indexControl.classList.add("index-control");
  indexControlPrevButton.textContent = "<";
  indexControl.appendChild(indexControlPrevButton);
  indexIndicatorText.classList.add("index-indicator-text");
  indexControl.appendChild(indexIndicatorText);
  indexControlNextButton.textContent = ">";
  indexControl.appendChild(indexControlNextButton);
  carouselElement.insertBefore(indexControl, carouselElement.firstChild);
  dotsContainer.classList.add("dots-container");
  slides.forEach((slide, index) => {
    slide.onmouseenter = (event) => clearInterval(myTimer);
    slide.onmouseleave = (event) => {
      clearInterval(myTimer);
      startAutoCarousel();
    };

    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.onclick = (event) => setCurrentSlide(index);
    dotsContainer.appendChild(dot);
  });
  carouselElement.appendChild(dotsContainer);

  const dots = dotsContainer.querySelectorAll("div.dot");
  let currentIndex;

  indexControlNextButton.onclick = (event) => progressSlide(+1);
  indexControlPrevButton.onclick = (event) => progressSlide(-1);

  function setCurrentSlide(newIndex) {
    clearInterval(myTimer);
    startAutoCarousel();
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

  function startAutoCarousel() {
    myTimer = setInterval(() => progressSlide(1), slideChangeInterval);
  }

  setCurrentSlide(0);
};

const CarouselModule = (() => {
  const carouselElements = document.querySelectorAll(CAROUSEL_TAG);

  carouselElements.forEach((carouselElement) => {
    CarouselFactory(carouselElement);
  });
})();

export { CarouselModule, CarouselFactory };
