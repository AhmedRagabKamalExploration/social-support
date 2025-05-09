import type { Meta, StoryObj } from "@storybook/react";

import { Muted } from "./muted";

const meta: Meta<typeof Muted> = {
  title: "Core/Components/Typography/Muted",
  component: Muted,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Muted>;

export const Default: Story = {
  args: {
    children: "This is muted text for secondary information.",
  },
};

export const InContext: Story = {
  render: () => (
    <div>
      <p>Main content paragraph</p>
      <Muted>Additional context or secondary information</Muted>
    </div>
  ),
};
