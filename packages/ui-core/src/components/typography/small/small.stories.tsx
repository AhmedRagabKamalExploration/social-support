import type { Meta, StoryObj } from "@storybook/react";

import { Small } from "./small";

const meta: Meta<typeof Small> = {
  title: "Core/Components/Typography/Small",
  component: Small,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Small>;

export const Default: Story = {
  args: {
    children: "This is small text for disclaimers or fine print.",
  },
};

export const InContext: Story = {
  render: () => (
    <div>
      <p>Main content paragraph</p>
      <Small>Additional disclaimer or fine print</Small>
    </div>
  ),
};
