"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    let current = 0;
    let interval = setInterval(nextSlide, 5000);
    function showSlide(index) {
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
    (_a = document.querySelector(".carousel-container")) === null || _a === void 0 ? void 0 : _a.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });
    (_b = document.querySelector(".carousel-container")) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseleave", () => {
        resetInterval();
    });
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }
    showSlide(current);
});
