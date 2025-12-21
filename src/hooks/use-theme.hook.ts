import { type MyTheme } from "@/styles/abstracts/colors.styled";
import { createContext, useContext } from "react";

interface ITC {
  lightTheme: MyTheme;
}

export const ThemeContext = createContext<ITC | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
