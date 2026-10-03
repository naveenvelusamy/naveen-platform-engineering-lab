"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "naveen-portfolio-theme";

type Theme = "dark" | "light";

function getThemeSnapshot(): Theme {
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "light"
    ? "light"
    : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("portfolio-theme-change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("portfolio-theme-change", onChange);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="theme-toggle"
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <svg viewBox="0 0 44 24" fill="none">
          <circle cx="11" cy="12" r="4" />
          <path d="M11 2.5v2M11 19.5v2M1.5 12h2M18.5 12h2M4.28 5.28l1.42 1.42m10.6 10.6 1.42 1.42m0-13.44L16.3 6.7M5.7 17.3l-1.42 1.42" />
          <path d="M34.5 4.25a8 8 0 1 0 5.25 14.03A8.2 8.2 0 0 1 34.5 4.25Z" />
        </svg>
      </span>
      <span className="sr-only">{isDark ? "Dark" : "Light"} theme</span>
    </button>
  );
}
