import type { Meta, StoryObj } from "@storybook/react";

import { Lead } from "./lead";

const meta: Meta<typeof Lead> = {
  title: "Core/Components/Typography/Lead",
  component: Lead,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Lead>;

export const Default: Story = {
  args: {
    children: "This is a lead paragraph that provides additional context.",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "This lead has a custom class applied.",
    className: "text-center italic",
  },
};
