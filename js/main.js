/* Splash Screen */

window.addEventListener('load', function() {
  const splash = document.getElementById('splash');
  const content = document.getElementById('content');
    setTimeout(function () {
    splash.style.opacity = 0;
    content.style.opacity = 1;
  }, 1500);
})

/* Открытие фотки */

const images = document.querySelectorAll('.photo-context');
const overlay = document.getElementById('overlay');
const zoomedImg = document.getElementById('zoomed-img');

let lastClickedImage = null;

if (zoomedImg) {
  zoomedImg.classList.add('no-transition');
}

if (overlay) {
  overlay.classList.remove('active');
}

images.forEach(img => {
  img.addEventListener('click', () => {
    lastClickedImage = img;
    img.style.opacity = '0';

    zoomedImg.src = img.src;

    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  });
});

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  });
}

function closeOverlay() {
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');

  setTimeout(() => {
    if (lastClickedImage) {
      lastClickedImage.style.opacity = '1';
      lastClickedImage = null;
    }
  }, 300);
}

/* Прогресс бар скрола */

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
});

/* Открытие Popup обратной связи */

const openPopup = document.getElementById('openPopup');
const feedbackPopup = document.getElementById('feedbackPopup');
const popupElements = document.getElementById('popupElements');

if (openPopup && feedbackPopup) {
  openPopup.addEventListener('click', () => {
    feedbackPopup.classList.toggle('active');
    popupElements.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  feedbackPopup.addEventListener('click', (e) => {
    if (e.target === feedbackPopup) {
      feedbackPopup.classList.remove('active');
      popupElements.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

/* Отображения span */

function checkWrapAndHideLastDot() {
    const container = document.getElementById("projectDetails");

    if (!container) return;

    const children = Array.from(container.children);

    const subtexts = children.filter(el => el.classList.contains("subtext"));

    if (subtexts.length < 2) return;

    const firstTop = subtexts[0].getBoundingClientRect().top;
    const lastTop = subtexts[subtexts.length - 1].getBoundingClientRect().top;

    const dots = children.filter(el => el.classList.contains("dot"));
    
    dots.forEach(dot => dot.style.display = "inline");

    if (firstTop !== lastTop) {

        if (dots.length > 0) {
            dots[dots.length - 1].style.display = "none";
        }
    }
}

window.addEventListener("load", checkWrapAndHideLastDot);
window.addEventListener("resize", checkWrapAndHideLastDot);
