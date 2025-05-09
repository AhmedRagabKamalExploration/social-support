import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";

import "@/index.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    // Add layout configuration
    layout: "centered",

    // Improve controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Show all controls by default
      sort: "requiredFirst",
    },

    // Add viewport configurations
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "360px", height: "640px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },

    // Add backgrounds configuration
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [],
        locales: "",
      },
    },
  },

  decorators: [
    // Theme decorator
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
