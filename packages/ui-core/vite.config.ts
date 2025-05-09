import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import reactPlugin from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import preserveDirectives from "rollup-preserve-directives";
import dtsPlugin from "vite-plugin-dts";
import { type ViteUserConfig, defineConfig } from "vitest/config";

import { dependencies, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      preserveDirectives(),
      reactPlugin(),
      dtsPlugin({
        include: ["src"],
        exclude: ["**/*.stories.*", "**/*.test.*", "**/test/**"],
        insertTypesEntry: true,
      }),
      visualizer(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    ...(command === "build" && {
      define: {
        "process.env.NODE_ENV": "'production'",
      },
    }),
    build: {
      target: "esnext",
      minify: false,
      outDir: "dist",
      emptyOutDir: false,
      lib: {
        entry: {
          "ui-core": path.resolve(import.meta.dirname, "src/index.ts"),
        },
        formats: ["es"],
      },
      rollupOptions: {
        external: [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
        ],
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          preserveModules: false,
        },
      },
    },
    // https://vitest.dev/config/
    test: {
      coverage: {
        provider: "v8",
        thresholds: {
          branches: 63,
          lines: 8,
        },
        exclude: ["**/__mocks__/**", "**/test/**"],
        reporter: ["text", "html"],
      },
      environment: "happy-dom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      typecheck: {
        include: ["src/**/*.{ts,tsx}"],
        tsconfig: "./tsconfig.json",
        ignoreSourceErrors: false,
      },
    },
  } satisfies ViteUserConfig;
});
