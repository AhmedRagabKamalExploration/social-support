import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./list";

const meta: Meta<typeof List> = {
  title: "Core/Components/Typography/List",
  component: List,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    children: (
      <>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </>
    ),
  },
};

export const Nested: Story = {
  args: {
    children: (
      <>
        <li>Main item 1</li>
        <li>
          Main item 2
          <ul className="ml-6 list-disc">
            <li>Nested item 1</li>
            <li>Nested item 2</li>
          </ul>
        </li>
        <li>Main item 3</li>
      </>
    ),
  },
};
