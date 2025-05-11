'use client';

import React, { useEffect } from 'react';

import { useFinancialRequestStore } from '@/store/financial-request.store';

type StoreHydrationProviderProps = {
  children: React.ReactNode;
};

/**
 * This component ensures that the store hydration state is properly initialized
 * It should be added near the root of your app to ensure hydration status is available everywhere
 */
export function StoreHydrationProvider({
  children,
}: StoreHydrationProviderProps) {
  const setHasHydrated = useFinancialRequestStore(
    (state) => state.setHasHydrated,
  );

  // Set hydration state to true once the component mounts on the client
  useEffect(() => {
    // Since this effect runs on the client, we can safely set hydration state to true
    // This handles the case when rehydration from storage has not occurred
    setHasHydrated(true);
  }, [setHasHydrated]);

  return <>{children}</>;
}
