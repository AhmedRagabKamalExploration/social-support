import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialogContext,
  useAlertDialogContext,
} from "./action-dialog-context";

describe("AlertDialogContext", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AlertDialogContext.Provider value={{ setOpen: vi.fn() }}>
      {children}
    </AlertDialogContext.Provider>
  );

  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useAlertDialogContext());
    }).toThrow(
      "useAlertDialogContext must be used within an AlertDialogContext.Provider",
    );
  });

  it("should provide context value when used within provider", () => {
    const { result } = renderHook(() => useAlertDialogContext(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.setOpen).toBeDefined();
  });

  it("should provide setOpen function that can be called", () => {
    const mockSetOpen = vi.fn();
    const customWrapper = ({ children }: { children: ReactNode }) => (
      <AlertDialogContext.Provider value={{ setOpen: mockSetOpen }}>
        {children}
      </AlertDialogContext.Provider>
    );

    const { result } = renderHook(() => useAlertDialogContext(), {
      wrapper: customWrapper,
    });

    result.current.setOpen(true);
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });
});
