// ================= MENU =================
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}
// ================= SLIDER ================= //
let index = 0;
const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(i) {
  if (i >= totalSlides) {
    index = 0;
  } else if (i < 0) {
    index = totalSlides - 1;
  } else {
    index = i;
  }

  slidesContainer.style.transform = "translateX(-" + index * 100 + "%)";
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

let currentImageIndex = 0;
let galleryImages = [];

// ================= LIGHTBOX =================
function openImage(img) {
  galleryImages = document.querySelectorAll(".product-card img");

  currentImageIndex = Array.from(galleryImages).indexOf(img);

  document.getElementById("lightbox").style.display = "flex";

  document.getElementById("lightbox-img").src = img.src;
}
function closeImage() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

function nextImage() {
  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  document.getElementById("lightbox-img").src =
    galleryImages[currentImageIndex].src;
}

function prevImage() {
  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  document.getElementById("lightbox-img").src =
    galleryImages[currentImageIndex].src;
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeImage();
  }
});

// ===== KEYBOARD SUPPORT =====

document.addEventListener("keydown", function (e) {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      prevImage();
    }

    if (e.key === "Escape") {
      closeImage();
    }
  }
});

// ===== MOBILE SWIPE =====

let startX = 0;

lightboxImg.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});

lightboxImg.addEventListener("touchend", function (e) {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextImage();
  }

  if (endX - startX > 50) {
    prevImage();
  }
});

// ===== LAPTOP MOUSE DRAG =====

lightboxImg.addEventListener("mousedown", function (e) {
  startX = e.clientX;
});

lightboxImg.addEventListener("mouseup", function (e) {
  let endX = e.clientX;

  if (startX - endX > 50) {
    nextImage();
  }

  if (endX - startX > 50) {
    prevImage();
  }
});
