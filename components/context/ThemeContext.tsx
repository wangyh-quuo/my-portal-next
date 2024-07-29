import React from "react";

export type ThemeState = "system" | "dark" | "light";

export const getThemeClassName = (theme: ThemeState) => {
  if (theme === "system") {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    return isDarkTheme.matches ? "dark" : "light";
  }
  return theme;
};

const ThemeContext = React.createContext<ThemeState>("light");

export default ThemeContext;
