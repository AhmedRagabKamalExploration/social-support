import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Add React Testing Library cleanup
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

// Add Happy DOM polyfills if needed
// eslint-disable-next-line unicorn/prefer-global-this
if (typeof window !== "undefined") {
  // eslint-disable-next-line unicorn/prefer-global-this
  const { happyDOM } = window as unknown as {
    happyDOM: { setURL: (url: string) => void };
  };
  happyDOM.setURL("http://localhost");
}
