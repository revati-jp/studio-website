import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import globals from "globals";

import eslintPluginAstro from "eslint-plugin-astro";

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["scripts/**/*.ts", "scripts/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      eqeqeq: ["error", "always"],
      // "@typescript-eslint/strict-boolean-expressions": "error",
    },
  },
  {
    ignores: ["src/layouts/Layout.astro"],
  },
];
