import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "./theme-provider";

type Theme = {
  defaultTheme: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  enableSystem: boolean;
  attribute: string;
  forcedTheme: string;
};

// Mock the next-themes package
vi.mock("next-themes", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ThemeProvider: vi.fn(({ children, ...props }) => (
    <div
      data-testid="mock-next-themes-provider"
      data-props={JSON.stringify(props)}
    >
      {children}
    </div>
  )),
}));

describe("ThemeProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders its children", () => {
    render(
      <ThemeProvider>
        <button>Test Button</button>
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Test Button" }),
    ).toBeInTheDocument();
  });

  it("passes custom theme to NextThemesProvider", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    const mockProvider = screen.getByTestId("mock-next-themes-provider");
    const passedProps = JSON.parse(mockProvider.dataset.props ?? "{}") as Theme;
    expect(passedProps.defaultTheme).toBe("dark");
  });

  it("passes custom enableSystem to NextThemesProvider", () => {
    render(
      <ThemeProvider enableSystem={false}>
        <div>Content</div>
      </ThemeProvider>,
    );

    const mockProvider = screen.getByTestId("mock-next-themes-provider");
    const passedProps = JSON.parse(mockProvider.dataset.props ?? "{}") as Theme;

    expect(passedProps.enableSystem).toBe(false);
  });

  it("passes additional props to NextThemesProvider", () => {
    render(
      <ThemeProvider attribute="class" forcedTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    const mockProvider = screen.getByTestId("mock-next-themes-provider");
    const passedProps = JSON.parse(mockProvider.dataset.props ?? "{}") as Theme;

    expect(passedProps.attribute).toBe("class");
    expect(passedProps.forcedTheme).toBe("dark");
  });

  it("works with interactive children", async () => {
    render(
      <ThemeProvider>
        <button>Click me</button>
      </ThemeProvider>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Click me" });

    await user.click(button);

    // Since this is just checking the provider allows interactions,
    // we're just verifying the button is clickable
    expect(button).toBeInTheDocument();
  });
});
