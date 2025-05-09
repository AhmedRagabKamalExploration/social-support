import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Large } from "./large";

describe("Large Component", () => {
  it("renders children correctly", () => {
    render(<Large>Large Text</Large>);
    expect(screen.getByText("Large Text")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Large>Large Text</Large>);
    const largeText = screen.getByText("Large Text");
    expect(largeText).toHaveClass("text-lg font-semibold");
  });

  it("merges custom className", () => {
    render(<Large className="custom-class">Large Text</Large>);
    const largeText = screen.getByText("Large Text");
    expect(largeText).toHaveClass("custom-class");
  });
});
