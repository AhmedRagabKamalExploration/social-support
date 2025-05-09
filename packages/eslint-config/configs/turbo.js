import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";

import { GLOB_TS, GLOB_TSX } from "../utils/glob.js";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default {
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    turbo: turboPlugin,
    "only-warn": onlyWarn,
  },
  rules: {
    "turbo/no-undeclared-env-vars": "warn",
  },
  ignores: ["dist/**"],
};
