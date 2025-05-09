import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Muted({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
