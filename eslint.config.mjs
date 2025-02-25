import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  nextPlugin.configs.recommended,
  {
    ignores: [
      "*.env",
      "*.json",
      "*.ico",
      "*.css",
      "tsconfig.json",
      "eslint.config.mjs",
    ],
  },
  {
    files: [
      "**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "components/ui/**/*.{js,ts,jsx,tsx}",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin, // ✅ Correctly registered
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.reduce(
        (acc, config) => ({ ...acc, ...config.rules }),
        {}
      ),
      ...pluginReact.configs.flat.recommended.rules,
      ...nextPlugin.configs.recommended.rules, // ✅ Correct usage for Next.js
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unknown-property": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
