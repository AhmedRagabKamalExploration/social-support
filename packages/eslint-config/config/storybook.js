import reactRefresh from "eslint-plugin-react-refresh";
import storybookPlugin from "eslint-plugin-storybook";

import { GLOB_TS, GLOB_TSX } from "../utils/glob.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default {
  ignores: ["dist"],
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    storybook: storybookPlugin,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...storybookPlugin.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
