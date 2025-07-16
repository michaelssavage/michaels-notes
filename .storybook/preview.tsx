import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import type { Decorator, Preview } from "@storybook/react-vite";

import {
	RouterProvider,
	createRootRoute,
	createRouter,
} from "@tanstack/react-router";
import React from "react";
import {
	type MyTheme,
	darkTheme,
	lightTheme,
} from "../src/styles/abstracts/colors.styled";
import { globalStyles } from "../src/styles/global.styled";

const RouterDecorator: Decorator = (Story) => {
	const rootRoute = createRootRoute({ component: () => <Story /> });
	const routeTree = rootRoute;
	const router = createRouter({ routeTree });
	return <RouterProvider router={router} />;
};
const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			test: "todo",
		},
	},

	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				icon: "circlehollow",
				items: ["light", "dark"],
			},
		},
	},

	decorators: [
		RouterDecorator,
		(Story, context) => {
			const theme: MyTheme =
				context.globals.theme === "dark" ? darkTheme : lightTheme;

			return (
				<EmotionThemeProvider theme={theme}>
					<Global styles={globalStyles(theme)} />
					<div
						style={{
							maxWidth: "800px",
							margin: "0 auto",
							display: "grid",
							placeContent: "center",
							padding: "1rem",
							borderRadius: "4px",
							backgroundColor: context.parameters.backgroundColor || "#ffffff",
						}}
					>
						<Story />
					</div>
				</EmotionThemeProvider>
			);
		},
	],
};

export default preview;
