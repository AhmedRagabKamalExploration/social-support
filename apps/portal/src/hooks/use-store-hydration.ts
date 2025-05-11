import { useEffect, useState } from 'react';

import { useFinancialRequestStore } from '@/store/financial-request.store';

/**
 * A hook that returns true once the component has mounted on the client
 * and the Zustand store has been hydrated with persisted data
 *
 * This is useful for Zustand stores that use the persist middleware
 * to avoid hydration mismatches and incorrect values on initial render
 */
export function useStoreHydration() {
  // Get hydration state from the store
  const storeHydrated = useFinancialRequestStore((state) => state._hasHydrated);

  // Track component mounting
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    // This runs only on the client after component hydration is complete
    setComponentMounted(true);
  }, []);

  // Both the component must be mounted and the store must be hydrated
  return componentMounted && storeHydrated;
}
