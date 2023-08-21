document.addEventListener("DOMContentLoaded", function () {
  const oferta = document.getElementById("oferta");
  const podlista = document.getElementById("podlista");
  const list = document.getElementById("list-nav");
  const menu = document.getElementById("menu");
  const input = document.getElementById("input-cont");
  const search = document.getElementById("search");

  oferta.addEventListener("click", function () {
    if (podlista.style.height === "0px" || podlista.style.height === "") {
      podlista.style.height = "160px"; // Adjust to your list's actual height
    } else {
      podlista.style.height = "0px";
    }
  });

  function toggleList() {
    list.classList.toggle("hidden");
  }

  function showInput() {
    input.classList.remove("hidden");
    setTimeout(() => {
      input.style.opacity = "1";
      input.style.transform = "translateX(0)";
    }, 20);
  }

  function hideInput() {
    input.style.opacity = "0";
    input.style.transform = "translateX(100%)";
    setTimeout(() => {
      input.classList.add("hidden");
    }, 500);
  }

  function hideListIfVisible() {
    if (!list.classList.contains("hidden")) {
      list.classList.add("hidden");
    }
  }

  menu.addEventListener("click", function () {
    toggleList();

    if (!input.classList.contains("hidden")) {
      input.classList.add("hidden");
    }
  });

  search.addEventListener("click", function () {
    if (input.classList.contains("hidden")) {
      showInput();
    } else {
      hideInput();
    }

    hideListIfVisible();
  });
});
