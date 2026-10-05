import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["build/**", "coverage/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    ...react.configs.flat.recommended,
    files: ["src/**/*.{js,jsx}"],
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.flat.recommended.rules,
      // React 19 removed propTypes; checkJs validates component props instead.
      "react/prop-types": "off",
    },
  },
  { ...react.configs.flat["jsx-runtime"], files: ["src/**/*.{js,jsx}"] },
  { ...reactHooks.configs.flat.recommended, files: ["src/**/*.{js,jsx}"] },
];
