let translations = {};

// Загружаем оба файла
Promise.all([
  fetch('assets/translations/main-translation.json').then(res => res.json()),
  fetch('assets/translations/project-1-translation.json').then(res => res.json())
]).then(([mainData, projectData]) => {
  // Объединяем переводы по всем языкам
  const allLangs = new Set([
    ...Object.keys(mainData),
    ...Object.keys(projectData)
  ]);

  allLangs.forEach(lang => {
    translations[lang] = {
      ...(mainData[lang] || {}),
      ...(projectData[lang] || {})
    };
  });

  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
});

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    const newText = translations[lang]?.[key];
    if (!newText) return;

    el.classList.add('fade-out');

    setTimeout(() => {
      el.textContent = newText;
      el.classList.remove('fade-out');
    }, 300);
  });

  localStorage.setItem('language', lang);
}

document.querySelectorAll('.language-link').forEach(item => {
  item.addEventListener('click', () => {
    setLanguage(item.id);
  });
});
