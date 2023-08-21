let currentSlide = 0;

document.getElementById("nextSlide").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % 2; // Assuming you have 2 slides
  document.querySelector(".slider-wrapper").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;
});

document.getElementById("prevSlide").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + 2) % 2; // Adding 2 to ensure the result isn't negative
  document.querySelector(".slider-wrapper").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;
});
