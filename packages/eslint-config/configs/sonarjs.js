import sonarjsPlugin from "eslint-plugin-sonarjs";

import { GLOB_TS, GLOB_TSX } from "../utils/glob.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default {
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    sonarjs: sonarjsPlugin,
  },
  rules: {
    ...sonarjsPlugin.configs.recommended.rules,
  },
};
