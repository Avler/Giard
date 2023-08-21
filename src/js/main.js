const ACCESS_KEY = "bl7yizmbHpnCkNh-9y0j7E2vqjyScXqUxQY9KYxicY8";
let currentPage = 1;
let currentImageIndex = -1;
let fetchedImages = [];

function showModal(photo) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");

  modal.classList.remove("hidden");
  modalImg.src = photo.urls.small;
  captionText.innerHTML = photo.description || "Zdjęcie z ogrodu";
}

function setupModalNavigation() {
  document.getElementById("nextArrow").onclick = function () {
    if (currentImageIndex < fetchedImages.length - 1) {
      currentImageIndex++;
      showModal(fetchedImages[currentImageIndex]);
    }
  };

  document.getElementById("prevArrow").onclick = function () {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      showModal(fetchedImages[currentImageIndex]);
    }
  };

  const modal = document.getElementById("imageModal");
  const span = document.querySelector(".close");
  span.onclick = function () {
    modal.classList.add("hidden");
  };
}

function createImageElement(photo, index) {
  const img = document.createElement("img");
  img.src = photo.urls.small;
  img.alt = photo.description || "Zdjęcie z ogrodu";
  img.classList.add(
    "w-full",
    "h-auto",
    "object-cover",
    "cursor-pointer",
    "mb-10",
    "hover:scale-105",
    "transform",
    "transition-transform"
  );
  img.setAttribute("loading", "lazy");

  img.onclick = function () {
    currentImageIndex = (currentPage - 1) * 10 + index;
    showModal(photo);
  };

  return img;
}

function fetchGardenImages(page = 1) {
  const url = `https://api.unsplash.com/search/photos?query=garden&client_id=${ACCESS_KEY}&page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const divElement = document.getElementById("masonry-grid");

      data.results.forEach((photo, index) => {
        fetchedImages.push(photo);
        const div = document.createElement("div");
        div.classList.add("break-inside-avoid");

        const img = createImageElement(photo, index);
        div.appendChild(img);
        divElement.appendChild(div);

        // Force a reflow to make the animation work
        void div.offsetWidth;
        div.classList.remove("opacity-0", "translate-y-4");
        div.classList.add("opacity-100", "translate-y-0");
      });
    })
    .catch((error) => {
      console.error("Wystąpił błąd podczas pobierania obrazków:", error);
    });
}

// Initialize the page and set up event listeners
document.getElementById("grid-expand").addEventListener("click", () => {
  currentPage++;
  fetchGardenImages(currentPage);
});
setupModalNavigation();
fetchGardenImages();
