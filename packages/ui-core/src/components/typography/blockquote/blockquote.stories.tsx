import type { Meta, StoryObj } from "@storybook/react";

import { Blockquote } from "./blockquote";

const meta: Meta<typeof Blockquote> = {
  title: "Core/Components/Typography/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
  args: {
    children: "This is a blockquote demonstrating important content.",
  },
};

export const CustomClass: Story = {
  args: {
    children: "Blockquote with custom styling",
    className: "text-primary border-primary",
  },
};
