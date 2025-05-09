# @dge/eslint-config

A comprehensive ESLint configuration package for modern JavaScript and TypeScript projects. This package provides shared configurations for various purposes including:

- **FormatJS**: Enforcing i18n message rules.
- **Next.js**: Rules for Next.js applications.
- **Prettier**: Disabling conflicting rules with Prettier.
- **React**: Best practices for React and JSX.
- **SonarJS**: Detecting bugs and suspicious patterns.
- **Storybook**: Linting rules for Storybook stories.
- **Turbo**: Recommended settings for Turbo projects.
- **Unicorn**: Enforcing modern best practices and consistent code style.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Package Structure](#package-structure)
- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This package exports various ESLint configuration objects that can be used as standalone configurations or combined for a comprehensive setup. By leveraging multiple plugins, it enforces best practices and ensures consistency across your codebase. The package supports file globs for TypeScript (`*.ts`, `*.tsx`) files and uses modern ESLint features (ESM exports, flat config structure) for optimal performance and compatibility.

## Key Features

- **Modular and Composable**: Each configuration file targets a specific area (React, Next.js, FormatJS, etc.) so you can extend or combine them as needed.
- **Shared Settings**: Centralized rules for naming conventions, best practices, and code style ensure consistency across projects.
- **Support for Multiple Frameworks**: Configurations for React, Next.js, and other libraries are all available.
- **Ease of Use**: Simply extend the provided configuration via your ESLint configuration file.
- **Type Safety**: Leveraging TypeScript’s type definitions for ESLint, ensuring correct configuration setup.

## Package Structure

The key folders and files in this package are:

- **configs/**: Contains the individual ESLint configuration files.
  - `typescript.js` – Shared config for TypeScript files with additional rules.
  - `formatjs.js` – Rules related to FormatJS internationalization.
  - `next.js` – Next.js specific ESLint configuration.
  - `prettier.js` – Prettier configuration to disable conflicting ESLint rules.
  - `react.js` – Rules and settings for React projects including JSX guidance.
  - `sonarjs.js` – Configuration for SonarJS to catch bugs and code smells.
  - `storybook.js` – Rules for linting Storybook files.
  - `turbo.js` – Configurations for projects using Turbo.
  - `unicorn.js` – Enforces modern code practices via eslint-plugin-unicorn.
- **utils/**:

  - `glob.js` – Contains glob patterns used to target files (e.g., `GLOB_TS`, `GLOB_TSX`).

- **index.js**: Acts as the main export file, re-exporting all configurations and utilities. This file lets consumers import specific configs, such as `formatjsConfig`, `nextConfig`, etc.

- **package.json**: Contains the package metadata, exports configuration, dependencies, and peer dependencies (including ESLint and globals).

## Usage

To use these ESLint configurations in your project, install the package and extend the configuration in your ESLint config file.

### Installation

Install the package via your package manager. For example, using pnpm:

```bash
pnpm add @dge/eslint-config --save-dev
```

> Note: Ensure you also have ESLint and any peer dependencies installed (such as ESLint v9 or later).

### Extending a Configuration

In your ESLint configuration file (.eslintrc.js or eslint.config.js), extend a specific configuration. For example, to use the Next.js configuration:

```javascript
import { nextConfig } from "@dge/eslint-config";

export default [
  // ...other configurations if needed
  nextConfig,
];
```

Alternatively, if you prefer a JavaScript config using CommonJS/ESM syntax, ensure you import the required configuration from the package's index file.

### Combining Configurations

You can also combine multiple configurations. For example, in a React project, you might want to use both the React and Prettier configurations:

```javascript
import { prettierConfig, reactConfig } from "@dge/eslint-config";

export default [reactConfig, prettierConfig];
```

## Contributing

## License
