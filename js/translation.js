let translations = {
  main: {},
  project1: {},
  project2: {},
  project3: {},
  project4: {}
};

const currentProject = getCurrentProject();

Promise.all([
  fetch('assets/translations/main-translation.json').then(res => res.json()),
  fetch('assets/translations/project-1-translation.json').then(res => res.json()),
  fetch('assets/translations/project-2-translation.json').then(res => res.json()),
  fetch('assets/translations/project-3-translation.json').then(res => res.json()),
  fetch('assets/translations/project-4-translation.json').then(res => res.json())
]).then(([mainData, project1Data, project2Data, project3Data, project4Data]) => {
  translations.main = mainData;
  translations.project1 = project1Data;
  translations.project2 = project2Data;
  translations.project3 = project3Data;
  translations.project4 = project4Data;

  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
});

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  const projectTranslations = {
    ...translations.main[lang],
    ...(translations[currentProject]?.[lang] || {})
  };

  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    const newText = projectTranslations[key];
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

function getCurrentProject() {
  if (window.location.pathname.includes('project-1')) return 'project1';
  if (window.location.pathname.includes('project-2')) return 'project2';
  if (window.location.pathname.includes('project-3')) return 'project3';
  if (window.location.pathname.includes('project-4')) return 'project4';
  return 'main';
}
