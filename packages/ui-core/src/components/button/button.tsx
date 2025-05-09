import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center dark:text-gray-50 gap-2 whitespace-nowrap rounded-md font-medium text-sm text-white disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-gray-800",
        destructive:
          "bg-destructive hover:bg-error-700 shadow-destructive-button focus:ring-error-500 disabled:bg-gray-100  disabled:border disabled:border-gray-200 disabled:shadow-disabled-button",
        outline:
          "border border-gray-300 bg-background hover:bg-accent text-gray-700 hover:text-accent-foreground  disabled:border-gray-200 disabled:shadow-disabled-button",
        secondary:
          "bg-secondary text-gray-600 hover:text-gray-700 hover:bg-gray-100 disabled:shadow-disabled-button",
        ghost:
          "hover:bg-accent text-gray-900 hover:text-accent-foreground dark:text-white",
        link: "text-gray-600 hover:text-gray-700",
        "link-primary": "text-purple-700 hover:text-purple-800",
        primary:
          "bg-purple-600 text-primary-foreground hover:bg-purple-700 shadow-button disabled:bg-gray-100  disabled:border disabled:border-gray-200 disabled:shadow-disabled-button",
        rounded: "bg-purple-600 hover:bg-purple-700 shadow-button rounded-full",
      },
      size: {
        sm: "h-9 rounded-md py-2 px-3 text-sm",
        md: "h-10 py-2.5 px-3.5 text-base",
        lg: "h-11 rounded-md py-2.5 px-4 text-base",
        xl: "py-3 px-4.5 h-12 text-base",
        "2xl": "py-4 px-5.5 h-14 text-xl",
        icon: "size-8 rounded-full hover:bg-primary/10 shrink-0",
      },
      iconPosition: {
        before: "flex-row",
        after: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      iconPosition: "after",
    },
  },
);

export type ButtonProps = {
  icon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    // eslint-disable-next-line react/boolean-prop-naming
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  iconPosition,
  icon,
  isLoading,
  loadingText,
  children,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, iconPosition, className }))}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          {children}
        </>
      )}
    </Comp>
  );
}

Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
