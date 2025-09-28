import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "build/**",
    "node_modules/**",
    "**/*.d.ts",
    ".tanstack/**",
    ".git/**",
    "playwright-report/**",
    "vite.config.ts",
  ]),

  // Base JS config
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript configs
  tseslint.configs.recommended,

  // React config
  pluginReact.configs.flat.recommended,

  // Main config with all plugins registered together
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["eslint.config.ts", ".storybook/**"],
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      react: pluginReact,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,

      // Custom overrides
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Storybook config without typed linting
  {
    files: [".storybook/**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      react: pluginReact,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,

      // Custom overrides
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
