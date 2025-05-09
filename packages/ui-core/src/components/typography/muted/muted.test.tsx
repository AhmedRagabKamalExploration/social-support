import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Muted } from "./muted";

describe("Muted Component", () => {
  it("renders children correctly", () => {
    render(<Muted>Muted Text</Muted>);
    expect(screen.getByText("Muted Text")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Muted>Muted Text</Muted>);
    const mutedText = screen.getByText("Muted Text");
    expect(mutedText).toHaveClass("text-sm text-muted-foreground");
  });

  it("merges custom className", () => {
    render(<Muted className="custom-class">Muted Text</Muted>);
    const mutedText = screen.getByText("Muted Text");
    expect(mutedText).toHaveClass("custom-class");
  });
});
