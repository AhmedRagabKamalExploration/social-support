import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type PersonalInformationFormData } from '@/features/financial-request/schema';
import { type FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';
import { type SituationDescriptionsFormData } from '@/features/financial-request/schema';

export interface FinancialRequestState {
  // Form data for each step
  personalInformation: PersonalInformationFormData | null;
  familyFinanceInfo: FamilyAndFinancialInfoFormData | null;
  situationDescriptions: SituationDescriptionsFormData | null;

  // Actions
  setPersonalInformation: (data: PersonalInformationFormData) => void;
  setFamilyFinanceInfo: (data: FamilyAndFinancialInfoFormData) => void;
  setSituationDescriptions: (data: SituationDescriptionsFormData) => void;

  // Get complete form data
  getCompleteFormData: () => {
    personalInformation: PersonalInformationFormData | null;
    familyFinanceInfo: FamilyAndFinancialInfoFormData | null;
    situationDescriptions: SituationDescriptionsFormData | null;
  };

  // Reset form data
  resetFormData: () => void;
}

export const useFinancialRequestStore = create<FinancialRequestState>()(
  persist(
    (set, get) => ({
      // Initial state
      personalInformation: null,
      familyFinanceInfo: null,
      situationDescriptions: null,

      // Actions
      setPersonalInformation: (data) => set({ personalInformation: data }),
      setFamilyFinanceInfo: (data) => set({ familyFinanceInfo: data }),
      setSituationDescriptions: (data) => set({ situationDescriptions: data }),

      // Get complete form data
      getCompleteFormData: () => ({
        personalInformation: get().personalInformation,
        familyFinanceInfo: get().familyFinanceInfo,
        situationDescriptions: get().situationDescriptions,
      }),

      // Reset form data
      resetFormData: () =>
        set({
          personalInformation: null,
          familyFinanceInfo: null,
          situationDescriptions: null,
        }),
    }),
    {
      name: 'financial-request-storage',
      // Optional: Configure storage (defaults to localStorage)
      // Storage events will be emitted only if this browser window/tab receives updates from somewhere else
      partialize: (state) => ({
        personalInformation: state.personalInformation,
        familyFinanceInfo: state.familyFinanceInfo,
        situationDescriptions: state.situationDescriptions,
      }),
    },
  ),
);
