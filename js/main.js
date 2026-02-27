// Nav: add shadow when scrolled
const nav = document.querySelector('.topnav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Lightbox
const images = document.querySelectorAll('.lightbox-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function showImage() {
  lightbox.style.display = 'flex';
  lightboxImg.src = images[currentIndex].src;
}

function hideLightbox() {
  lightbox.style.display = 'none';
}

images.forEach((img, index) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = index;
    showImage();
  });
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

document.querySelector('#lightbox .close').addEventListener('click', hideLightbox);

// Close when clicking backdrop (not the image or controls)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) hideLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }
  if (e.key === 'Escape') hideLightbox();
});
