import { useEffect, useState } from "react";
import styles from "./Toggle.module.scss";
import { SunIcon, MoonIcon } from "../icons";

export const Toggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") ?? "light";
    document.documentElement.setAttribute("data-theme", localTheme);
    setTheme(localTheme);
  }, []);

  const isChecked = theme === "light";

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <input
        id="toggle_checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={toggleTheme}
        className={styles.toggler}
      />
      <label htmlFor="toggle_checkbox" className={styles.icon}>
        <SunIcon id="star" />
        <MoonIcon id="moon" />
      </label>
    </>
  );
};
