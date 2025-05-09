import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("variant", () => {
  it("should render primary as default variant", () => {
    const { asFragment } = render(<Button>default</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          default
        </button>
      </DocumentFragment>
    `);
  });

  it("should render default variant", () => {
    const { asFragment } = render(<Button variant="default">default</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          default
        </button>
      </DocumentFragment>
    `);
  });

  it("should render destructive variant", () => {
    const { asFragment } = render(
      <Button variant="destructive">destructive</Button>,
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-white disabled:text-gray-400 focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-destructive hover:bg-error-700 shadow-destructive-button focus:ring-error-500 disabled:bg-gray-100 disabled:border disabled:border-gray-200 disabled:shadow-disabled-button h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          destructive
        </button>
      </DocumentFragment>
    `);
  });

  it("should render outline variant", () => {
    const { asFragment } = render(<Button variant="outline">outline</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-gray-300 bg-background hover:bg-accent text-gray-700 hover:text-accent-foreground disabled:border-gray-200 disabled:shadow-disabled-button h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          outline
        </button>
      </DocumentFragment>
    `);
  });

  it("should render secondary variant", () => {
    const { asFragment } = render(
      <Button variant="secondary">secondary</Button>,
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-secondary text-gray-600 hover:text-gray-700 hover:bg-gray-100 disabled:shadow-disabled-button h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          secondary
        </button>
      </DocumentFragment>
    `);
  });

  it("should render ghost variant", () => {
    const { asFragment } = render(<Button variant="ghost">ghost</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none hover:bg-accent text-gray-900 hover:text-accent-foreground h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          ghost
        </button>
      </DocumentFragment>
    `);
  });

  it("should render link variant", () => {
    const { asFragment } = render(<Button variant="link">link</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none text-gray-600 hover:text-gray-700 h-10 py-2.5 px-3.5 text-base flex-row-reverse"
          data-slot="button"
        >
          link
        </button>
      </DocumentFragment>
    `);
  });
});

describe("size", () => {
  it("should render size sm", () => {
    const { asFragment } = render(<Button size="sm">sm</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md py-2 px-3 text-sm flex-row-reverse"
          data-slot="button"
        >
          sm
        </button>
      </DocumentFragment>
    `);
  });

  it("should render size lg", () => {
    const { asFragment } = render(<Button size="lg">lg</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md py-2.5 px-4 text-base flex-row-reverse"
          data-slot="button"
        >
          lg
        </button>
      </DocumentFragment>
    `);
  });

  it("should render size icon", () => {
    const { asFragment } = render(<Button size="icon">icon</Button>);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm disabled:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 size-11 flex-row-reverse"
          data-slot="button"
        >
          icon
        </button>
      </DocumentFragment>
    `);
  });
});

describe("props", () => {
  it("should handle click", async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>click</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render as child", () => {
    const { asFragment } = render(
      <Button asChild>
        <a href="#test">click</a>
      </Button>,
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <a
          href="#test"
        >
          click
        </a>
      </DocumentFragment>
    `);
  });
});
