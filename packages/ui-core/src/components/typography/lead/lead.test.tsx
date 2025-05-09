import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Lead } from "@/components/typography/lead/lead";

describe("Lead", () => {
  it("should render default variant", () => {
    const { asFragment } = render(
      <Lead>
        A modal dialog that interrupts the user with important content and
        expects a response.
      </Lead>,
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-xl text-muted-foreground"
        >
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      </DocumentFragment>
    `);
  });
});
