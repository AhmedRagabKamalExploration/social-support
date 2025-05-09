import formatjsPlugin from "eslint-plugin-formatjs";

import { GLOB_TS, GLOB_TSX } from "../utils/glob.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default {
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    formatjs: formatjsPlugin,
  },
  rules: {
    "formatjs/enforce-default-message": ["error", "literal"],
    "formatjs/enforce-id": "error",
    "formatjs/no-multiple-plurals": "error",
    "formatjs/no-multiple-whitespaces": "error",
    "formatjs/no-offset": "error",
  },
};
