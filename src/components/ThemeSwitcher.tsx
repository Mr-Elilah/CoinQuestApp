"use client";

import { useTheme } from "@/src/hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className=" flex gap-2 text-sm">
      <button
        onClick={() => setTheme("light")}
        className={`px-2 py-1 rounded ${
          theme === "light"
            ? "bg-blue-600 text-white"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        ☀ Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-2 py-1 rounded ${
          theme === "dark"
            ? "bg-blue-600 text-white"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        🌙 Dark
      </button>
    </div>
  );
}
