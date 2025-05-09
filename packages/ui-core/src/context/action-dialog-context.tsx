"use client";

import { createContext, useContext } from "react";

type AlertDialogContextType = {
  setOpen: (open: boolean) => void;
};

export const AlertDialogContext = createContext<
  AlertDialogContextType | undefined
>(undefined);

export function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialogContext must be used within an AlertDialogContext.Provider",
    );
  }
  return context;
}
