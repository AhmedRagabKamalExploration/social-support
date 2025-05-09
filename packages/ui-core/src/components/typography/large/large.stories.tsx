import type { Meta, StoryObj } from "@storybook/react";

import { Large } from "./large";

const meta: Meta<typeof Large> = {
  title: "Core/Components/Typography/Large",
  component: Large,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Large>;

export const Default: Story = {
  args: {
    children: "This is large, emphasized text.",
  },
};

export const WithCustomStyle: Story = {
  args: {
    children: "Large text with custom styling",
    className: "text-primary",
  },
};
