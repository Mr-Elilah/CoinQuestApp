"use client";
import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function set(next: Theme) {
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return {
    theme,
    setTheme: set,
  };
}
