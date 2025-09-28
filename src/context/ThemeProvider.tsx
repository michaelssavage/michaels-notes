import { type MyTheme, lightTheme } from "@/styles/abstracts/colors.styled";
import { globalStyles } from "@/styles/global.styled";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import { type ReactNode, createContext, useContext, useMemo } from "react";

interface ITC {
  lightTheme: MyTheme;
}

interface ITP {
  children: ReactNode;
}

const ThemeContext = createContext<ITC | undefined>(undefined);

export const ThemeProvider = ({ children }: ITP) => {
  const value = useMemo(() => ({ lightTheme }), []);

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={lightTheme}>
        <Global styles={globalStyles(lightTheme)} />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
