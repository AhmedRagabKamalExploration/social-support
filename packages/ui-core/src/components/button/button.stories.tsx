import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeft, ArrowRight, Mail, Send } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Core/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "primary",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "icon"],
    },
    iconPosition: {
      control: "radio",
      options: ["before", "after"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base variants
export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Disabled Secondary Button",
    disabled: true,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const OutlineWithIcon: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
    icon: <ArrowRight className="h-4 w-4" />,
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: "outline",
    children: "Disabled Outline Button",
    disabled: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const DisabledDestructive: Story = {
  args: {
    variant: "destructive",
    children: "Disabled Destructive Button",
    disabled: true,
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const DisabledLink: Story = {
  args: {
    variant: "link",
    children: "Disabled Link Button",
    disabled: true,
  },
};

export const LinkPrimary: Story = {
  args: {
    variant: "link-primary",
    children: "Link Primary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

// With Icons
export const WithIconAfter: Story = {
  args: {
    children: "Next",
    icon: <ArrowRight className="h-4 w-4" />,
    iconPosition: "after",
  },
};

export const WithIconBefore: Story = {
  args: {
    children: "Back",
    icon: <ArrowLeft className="h-4 w-4" />,
    iconPosition: "before",
  },
};

export const IconButton: Story = {
  args: {
    size: "icon",
    icon: <Mail className="h-4 w-4" />,
    "aria-label": "Send email",
  },
};

export const RoundedIconButton: Story = {
  args: {
    size: "icon",
    variant: "rounded",
    icon: <Mail className="h-4 w-4" />,
  },
};

export const DisabledPrimary: Story = {
  args: {
    variant: "primary",
    children: "Disabled Primary",
    disabled: true,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    variant: "primary",
    children: "Disabled with Icon",
    icon: <ArrowRight className="h-4 w-4" />,
    disabled: true,
  },
};

export const DisabledLoading: Story = {
  args: {
    variant: "primary",
    children: "Disabled Loading",
    isLoading: true,
    disabled: true,
  },
};

// Loading States
export const Loading: Story = {
  args: {
    children: "Submit",
    isLoading: true,
  },
};

export const LoadingWithText: Story = {
  args: {
    children: "Save Changes",
    isLoading: true,
    loadingText: "Saving...",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large Button",
  },
};

export const TwoExtraLarge: Story = {
  args: {
    size: "2xl",
    children: "2XL Button",
  },
};

// States
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

// Complex Example
export const ComplexButton: Story = {
  args: {
    variant: "primary",
    size: "lg",
    icon: <Send className="h-4 w-4" />,
    children: "Send Message",
    iconPosition: "before",
  },
};
