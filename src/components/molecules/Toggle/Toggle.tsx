import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon, SunIcon } from "../../icons";
import { ToggleIcon, ToggleInput } from "./Toggle.styled";

export const Toggle = () => {
	const { mode, toggleTheme } = useTheme();

	return (
		<ToggleIcon>
			<ToggleInput
				type="checkbox"
				checked={mode === "light"}
				onChange={toggleTheme}
			/>
			<SunIcon id="star" />
			<MoonIcon id="moon" />
		</ToggleIcon>
	);
};
