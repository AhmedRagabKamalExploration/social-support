import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Small({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}
