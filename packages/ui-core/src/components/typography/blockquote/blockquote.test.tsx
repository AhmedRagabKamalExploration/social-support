import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Blockquote } from "./blockquote";

describe("Blockquote Component", () => {
  it("renders children correctly", () => {
    render(<Blockquote>Test Quote</Blockquote>);
    expect(screen.getByText("Test Quote")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Blockquote>Test Quote</Blockquote>);
    const blockquote = screen.getByText("Test Quote");
    expect(blockquote).toHaveClass("mt-6 border-l-2 pl-6 italic");
  });

  it("merges custom className", () => {
    render(<Blockquote className="custom-class">Test Quote</Blockquote>);
    const blockquote = screen.getByText("Test Quote");
    expect(blockquote).toHaveClass("custom-class");
  });
});
