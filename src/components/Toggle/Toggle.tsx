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
    <div className={styles.container}>
      <input
        id="toggle_checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={toggleTheme}
      />
      <label htmlFor="toggle_checkbox">
        <SunIcon id="star" />
        <MoonIcon id="moon" />
      </label>
    </div>
  );
};
