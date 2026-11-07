// The saved theme is applied by an inline script in <head> so the page never
// flashes the wrong colors. This file only wires up the toggle button.
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function isDark() {
  return root.dataset.theme
    ? root.dataset.theme === 'dark'
    : systemDark.matches;
}

function syncToggle() {
  toggle.setAttribute('aria-pressed', String(isDark()));
}

toggle.addEventListener('click', () => {
  const theme = isDark() ? 'light' : 'dark';
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be blocked (private browsing); the toggle still works for this visit.
  }
  syncToggle();
});

systemDark.addEventListener('change', syncToggle);
syncToggle();
toggle.hidden = false;
