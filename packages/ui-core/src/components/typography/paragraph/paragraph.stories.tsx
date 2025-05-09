import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./paragraph";

const meta = {
  title: "Core/Components/Typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VariantDefault: Story = {
  args: {
    children: "This is a standard paragraph with default styling and spacing.",
  },
};

export const MultipleParagraphs: Story = {
  args: {
    children: "This is a standard paragraph with default styling and spacing.",
  },
  render: () => (
    <div>
      <Paragraph>
        First paragraph demonstrating the default spacing and styling. The text
        flows naturally and maintains consistent line height.
      </Paragraph>
      <Paragraph>
        Second paragraph showing the automatic margin top that&apos;s applied to
        paragraphs that aren&apos;t the first child.
      </Paragraph>
      <Paragraph>
        Third paragraph further illustrating the spacing between paragraphs in a
        content flow.
      </Paragraph>
    </div>
  ),
};
