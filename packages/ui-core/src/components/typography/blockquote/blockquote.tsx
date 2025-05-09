import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Blockquote({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return (
    <p className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</p>
  );
}
