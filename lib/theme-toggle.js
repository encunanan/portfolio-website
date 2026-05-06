(() => {
  const STORAGE_KEY = 'theme';
  const toggleInputs = Array.from(document.querySelectorAll('.theme-toggle-input'));
  if (!document.body) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    toggleInputs.forEach((input) => { input.checked = isDark; });
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  };

  const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark.matches;
  applyTheme(initialIsDark);

  toggleInputs.forEach((input) => {
    input.addEventListener('change', (event) => applyTheme(event.target.checked));
  });

  prefersDark.addEventListener('change', (event) => {
    const manualSetting = localStorage.getItem(STORAGE_KEY);
    if (!manualSetting) applyTheme(event.matches);
  });
})();

