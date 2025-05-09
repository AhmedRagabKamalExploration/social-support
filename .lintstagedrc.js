export default {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    // Group files by directory
    const packageFiles = {};

    filenames.forEach((file) => {
      const packageDir = file.split("/").slice(0, 2).join("/");
      if (!packageFiles[packageDir]) {
        packageFiles[packageDir] = [];
      }
      packageFiles[packageDir].push(file);
    });

    // Create commands for each package
    const commands = [];

    Object.entries(packageFiles).forEach(([dir, files]) => {
      if (files.length > 0) {
        commands.push(
          `cd ${dir} && eslint --fix ${files.map((f) => f.replace(`${dir}/`, "")).join(" ")}`,
        );
      }
    });

    // Add prettier commands
    commands.push(`prettier --write ${filenames.join(" ")}`);

    return commands;
  },
  "*.{json,md}": ["prettier --write"],
};
