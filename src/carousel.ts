document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll<HTMLElement>(".carousel-slide");
  const prevBtn = document.getElementById("prev-slide") as HTMLButtonElement;
  const nextBtn = document.getElementById("next-slide") as HTMLButtonElement;
  let current = 0;
  let interval = setInterval(nextSlide, 5000);

  function showSlide(index: number) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlideFunc() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  prevBtn.addEventListener("click", () => {
    prevSlideFunc();
    resetInterval();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  document.querySelector(".carousel-container")?.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  document.querySelector(".carousel-container")?.addEventListener("mouseleave", () => {
    resetInterval();
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  showSlide(current);
});
