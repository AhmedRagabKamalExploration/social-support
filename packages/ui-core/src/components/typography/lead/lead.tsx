import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Lead({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}
