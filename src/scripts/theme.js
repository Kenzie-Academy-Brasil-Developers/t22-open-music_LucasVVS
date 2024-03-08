// theme.js

const toggleThemeBtn = document.getElementById("theme-toggle");
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const THEME_KEY = "@openMusic:theme";
const DEFAULT_THEME = "light";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme || DEFAULT_THEME;
};

const setTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    toggleThemeBtn.innerHTML = `
      <img src="/src/assets/icons/sun-icon.svg" alt="Light mode icon">
      <span class="night-button"></span>
    `;
  } else {
    body.classList.remove("dark-mode");
    toggleThemeBtn.innerHTML = `
      <img src="/src/assets/icons/moon-icon.svg" alt="Dark mode icon">
      <span class="night-button"></span>
    `;
  }
  localStorage.setItem(THEME_KEY, theme);
};

const toggleTheme = () => {
  const currentTheme = body.classList.contains("dark-mode") ? "light" : "dark";
  setTheme(currentTheme);
};

const initialTheme = getInitialTheme();
setTheme(initialTheme);

// Verifica se o navegador já possui uma preferência de tema escuro
if (prefersDarkScheme.matches) {
  setTheme("dark");
}

// Adiciona o manipulador de eventos para o botão de alternar tema
toggleThemeBtn.addEventListener("click", toggleTheme);

export { toggleTheme, getInitialTheme, setTheme };
