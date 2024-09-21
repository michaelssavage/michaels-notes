import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../icons";
import styles from "./Toggle.module.scss";

export const Toggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") ?? "light";
    document.documentElement.setAttribute("data-theme", localTheme);
    setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className={styles.icon}>
      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={toggleTheme}
        className={styles.toggler}
      />
      <SunIcon id="star" />
      <MoonIcon id="moon" />
    </label>
  );
};
