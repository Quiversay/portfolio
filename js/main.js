/* Splash Screen */

window.addEventListener('load', function() {
  const splash = document.getElementById('splash');
  const content = document.getElementById('content');
    setTimeout(function () {
    splash.style.opacity = 0;
    content.style.opacity = 1;
  }, 1500);
})

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
