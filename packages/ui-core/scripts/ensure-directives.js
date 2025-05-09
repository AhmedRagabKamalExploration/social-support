#!/usr/bin/env node

/**
 * This script ensures that all component files in the UI-core package
 * have the necessary 'use client' directive at the top.
 */

const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.resolve(__dirname, "../src/components");
const PROVIDERS_DIR = path.resolve(__dirname, "../src/providers");
const USE_CLIENT_DIRECTIVE = "'use client';\n\n";

/**
 * Check if a file already has the 'use client' directive
 */
function hasUseClientDirective(content) {
  return /('use client'|"use client")/.test(content.slice(0, 100));
}

/**
 * Add the 'use client' directive to a file if it doesn't have it
 */
function addUseClientDirective(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Skip if the file already has the directive
    if (hasUseClientDirective(content)) {
      console.log(
        `✓ ${path.relative(process.cwd(), filePath)} already has directive`,
      );
      return;
    }

    // Add the directive and write back to the file
    fs.writeFileSync(filePath, USE_CLIENT_DIRECTIVE + content);
    console.log(
      `✓ Added directive to ${path.relative(process.cwd(), filePath)}`,
    );
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Recursively process files in a directory
 */
function processDirectory(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (
      /\.(tsx?|jsx?)$/.test(file.name) &&
      !file.name.includes(".test.") &&
      !file.name.includes(".stories.")
    ) {
      addUseClientDirective(fullPath);
    }
  }
}

// Process components and providers directories
console.log(
  '🔍 Ensuring all component files have the "use client" directive...',
);
processDirectory(COMPONENTS_DIR);
processDirectory(PROVIDERS_DIR);
console.log("✅ Done!");
