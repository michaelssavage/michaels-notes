import { Global } from "@emotion/react";
import type { Decorator, Preview } from "@storybook/react-vite";
import React from "react";

import {
  RouterProvider,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
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
        items: ["light"],
      },
    },
  },

  decorators: [
    RouterDecorator,
    (Story, context) => {
      return (
        <>
          <Global styles={globalStyles} />
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
        </>
      );
    },
  ],
};

export default preview;
