const ACCESS_KEY = "bl7yizmbHpnCkNh-9y0j7E2vqjyScXqUxQY9KYxicY8";
let currentPage = 1;
let currentImageIndex = -1; // track currently displayed image in the modal
let fetchedImages = []; // to store fetched images

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

        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.description || "Zdjęcie z ogrodu";
        img.classList.add("w-full", "h-auto", "object-cover", "cursor-pointer");
        img.setAttribute("loading", "lazy");

        // Inside the fetchGardenImages function, for the img.onclick
        img.onclick = function () {
          const modal = document.getElementById("imageModal");
          const modalImg = document.getElementById("img01");
          const captionText = document.getElementById("caption");

          modal.classList.remove("hidden"); // just toggle the hidden class
          modalImg.src = photo.urls.full;
          captionText.innerHTML = img.alt;
          currentImageIndex = (currentPage - 1) * 10 + index; // set current image index
          showModal(photo);
        };

        function showModal(photo) {
          const modal = document.getElementById("imageModal");
          const modalImg = document.getElementById("img01");
          const captionText = document.getElementById("caption");

          modal.classList.remove("hidden");
          modalImg.src = photo.urls.full;
          captionText.innerHTML = photo.description || "Zdjęcie z ogrodu";
        }

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
        // Close modal when clicking the 'X'
        const modal = document.getElementById("imageModal");
        const span = document.querySelector(".close");
        span.onclick = function () {
          modal.classList.add("hidden"); // just toggle the hidden class
        };

        div.appendChild(img);
        divElement.appendChild(div);
      });
    })

    .catch((error) => {
      console.error("Wystąpił błąd podczas pobierania obrazków:", error);
    });
}

document.getElementById("grid-expand").addEventListener("click", () => {
  currentPage++;
  fetchGardenImages(currentPage);
});

fetchGardenImages();
