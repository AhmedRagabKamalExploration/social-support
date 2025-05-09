import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "@/components/separator/separator";
import {
  Blockquote,
  Code,
  Headline,
  Large,
  Lead,
  List,
  Muted,
  Paragraph,
  Small,
} from "@/components/typography/typography";

const meta: Meta = {
  title: "Core/Components/Typography",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <Headline variant="h1">Heading 1</Headline>
      <Headline variant="h2">Heading 2</Headline>
      <Headline variant="h3">Heading 3</Headline>
      <Headline variant="h4">Heading 4</Headline>

      <Separator />

      <Lead>This is a lead paragraph - used for introductory text</Lead>
      <Paragraph>
        This is a regular paragraph with normal text styling.
      </Paragraph>
      <Large>Large text component for emphasized content</Large>
      <Small>Small text component for disclaimers and fine print</Small>
      <Muted>Muted text for de-emphasized content</Muted>

      <Separator />

      <Blockquote>
        &quot;This is a blockquote component used to highlight important quotes
        or content.&quot;
      </Blockquote>

      <Separator />

      <List>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </List>

      <Separator />

      <div className="space-y-2">
        <Code>Inline code example</Code>
        <pre className="rounded-md bg-muted p-4">
          <Code className="block">
            {" "}
            Code block example\nconsole.log(&apos;Hello World&apos;);
          </Code>
        </pre>
      </div>
    </div>
  ),
};

export const TextHierarchy: Story = {
  render: () => (
    <article className="prose dark:prose-invert">
      <Headline variant="h1">Article Title</Headline>
      <Lead>This is the lead paragraph introducing the article content.</Lead>

      <Headline variant="h2">Section Title</Headline>
      <Paragraph>
        This is a body paragraph containing the main content. It includes some{" "}
        <Code>inline code</Code> and a <Small>small text note</Small>.
      </Paragraph>

      <Headline variant="h3">Subsection Title</Headline>
      <Paragraph>
        Another paragraph demonstrating text hierarchy. Here&apos;s a{" "}
        <Muted>muted text segment</Muted> for additional context.
      </Paragraph>

      <Blockquote>
        &quot;This blockquote emphasizes an important point related to the
        article content.&quot;
      </Blockquote>

      <List>
        <li>First item in an unordered list</li>
        <li>
          Second list item with <Code>inline code</Code>
        </li>
        <li>
          Third list item with <Small>small text</Small>
        </li>
      </List>
    </article>
  ),
};
