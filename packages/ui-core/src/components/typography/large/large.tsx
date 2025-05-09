import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Large({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}
