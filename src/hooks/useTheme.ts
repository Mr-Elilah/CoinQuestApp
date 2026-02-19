"use client";
import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initial: Theme = stored ?? (systemPrefersDark ? "dark" : "light");

    setTheme(initial);

    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function set(next: Theme) {
    setTheme(next);
    localStorage.setItem("theme", next);

    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return {
    theme,
    setTheme: set,
  };
}
