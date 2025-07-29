import {
	type MyTheme,
	darkTheme,
	lightTheme,
} from "@/styles/abstracts/colors.styled";
import { globalStyles } from "@/styles/global.styled";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type modeType = "light" | "dark";

interface ITC {
	mode: modeType;
	toggleTheme: () => void;
}

interface ITP {
	children: ReactNode;
}

const ThemeContext = createContext<ITC | undefined>(undefined);

export const ThemeProvider = ({ children }: ITP) => {
	const [mode, setMode] = useState<modeType>("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as modeType | null;
		if (savedTheme) {
			setMode(savedTheme);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", mode);
	}, [mode]);

	const toggleTheme = useCallback(() => {
		setMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	}, []);

	const theme: MyTheme = useMemo(
		() => (mode === "light" ? lightTheme : darkTheme),
		[mode],
	);

	const value = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

	return (
		<ThemeContext.Provider value={value}>
			<EmotionThemeProvider theme={theme}>
				<Global styles={globalStyles(theme)} />
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
