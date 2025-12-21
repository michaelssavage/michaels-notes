import { ThemeContext } from "@/hooks/use-theme.hook";
import { lightTheme } from "@/styles/abstracts/colors.styled";
import { globalStyles } from "@/styles/global.styled";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import { type ReactNode, useMemo } from "react";

interface ITP {
  children: ReactNode;
}

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
