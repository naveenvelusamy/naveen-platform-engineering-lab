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
        {isDark ? "☾" : "☼"}
      </span>
      <span>{isDark ? "Dark" : "Light"} theme</span>
    </button>
  );
}
