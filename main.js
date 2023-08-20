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

        // Inside the fetchGardenImages function, for the img.onclick
        img.onclick = function () {
          const modal = document.getElementById("imageModal");
          const modalImg = document.getElementById("img01");
          const captionText = document.getElementById("caption");

          modal.classList.remove("hidden"); // just toggle the hidden class
          modalImg.src = photo.urls.small;
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

        // Force a reflow to make the animation work
        void div.offsetWidth;
        // Now modify to the final state to trigger the animation
        div.classList.remove("opacity-0", "translate-y-4");
        div.classList.add("opacity-100", "translate-y-0");
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

document.addEventListener("DOMContentLoaded", function () {
  const oferta = document.getElementById("oferta");
  const podlista = document.getElementById("podlista");

  oferta.addEventListener("click", function () {
    if (podlista.style.height === "0px" || podlista.style.height === "") {
      podlista.style.height = "160px"; // Przykładowa wartość, dostosuj do rzeczywistej wysokości Twojej listy
    } else {
      podlista.style.height = "0px";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const list = document.getElementById("list-nav");

  menu.addEventListener("click", function () {
    if (list.classList.contains("hidden")) {
      list.classList.remove("hidden");
      // Zwróć uwagę, że może to być niepotrzebne, jeśli klasa "hidden" manipuluje wysokością
    } else {
      list.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("search");
  const input = document.getElementById("input-cont");

  search.addEventListener("click", function () {
    if (input.classList.contains("hidden")) {
      input.classList.remove("hidden");
      setTimeout(() => {
        input.style.opacity = "1";
        input.style.transform = "translateX(0)";
      }, 20); // slight delay to ensure styles are applied after the element is visible
    } else {
      input.style.opacity = "0";
      input.style.transform = "translateX(100%)";
      // After animation ends, hide the div to prevent it from blocking other elements.
      setTimeout(() => {
        input.classList.add("hidden");
      }, 500); // 500ms matches the duration of our transition
    }
  });
});

fetchGardenImages();
