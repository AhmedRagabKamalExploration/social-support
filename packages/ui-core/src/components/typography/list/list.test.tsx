import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { List } from "./list";

describe("List Component", () => {
  it("renders children correctly", () => {
    render(
      <List>
        <li>Item 1</li>
        <li>Item 2</li>
      </List>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(
      <List>
        <li>Item</li>
      </List>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("my-6 ml-6 list-disc [&>li]:mt-2");
  });

  it("merges custom className", () => {
    render(
      <List className="custom-class">
        <li>Item</li>
      </List>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("custom-class");
  });
});
