"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-md",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "h-9 data-[state=active]:bg-background w-full data-[state=active]:text-foreground first:data-[state=active]:border-s-[0px] border border-transparent data-[state=active]:border-input ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-invalid:focus-visible:ring-0 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex-1 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
