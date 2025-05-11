import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { PersonalInformationFormData } from '@/features/financial-request/schema';
import type { FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';
import type { SituationDescriptionsFormData } from '@/features/financial-request/schema';

export type FinancialRequestState = {
  personalInformation: PersonalInformationFormData | null;
  familyFinanceInfo: FamilyAndFinancialInfoFormData | null;
  situationDescriptions: SituationDescriptionsFormData | null;

  isPersonalInformationCompleted: boolean;
  isFamilyFinanceInfoCompleted: boolean;

  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  setPersonalInformation: (data: PersonalInformationFormData) => void;
  setFamilyFinanceInfo: (data: FamilyAndFinancialInfoFormData) => void;
  setSituationDescriptions: (data: SituationDescriptionsFormData) => void;

  setPersonalInformationCompleted: (isCompleted: boolean) => void;
  setFamilyFinanceInfoCompleted: (isCompleted: boolean) => void;

  getCompleteFormData: () => {
    personalInformation: PersonalInformationFormData | null;
    familyFinanceInfo: FamilyAndFinancialInfoFormData | null;
    situationDescriptions: SituationDescriptionsFormData | null;
  };

  resetFormData: () => void;
};

export const useFinancialRequestStore = create<FinancialRequestState>()(
  persist(
    (set, get) => ({
      personalInformation: null,
      familyFinanceInfo: null,
      situationDescriptions: null,

      isPersonalInformationCompleted: false,
      isFamilyFinanceInfoCompleted: false,

      // Initialize hydration state as false
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },

      setPersonalInformation: (data) => {
        set({ personalInformation: data });
      },
      setFamilyFinanceInfo: (data) => {
        set({ familyFinanceInfo: data });
      },
      setSituationDescriptions: (data) => {
        set({ situationDescriptions: data });
      },

      setPersonalInformationCompleted: (isCompleted) => {
        set({ isPersonalInformationCompleted: isCompleted });
      },
      setFamilyFinanceInfoCompleted: (isCompleted) => {
        set({ isFamilyFinanceInfoCompleted: isCompleted });
      },

      getCompleteFormData: () => ({
        personalInformation: get().personalInformation,
        familyFinanceInfo: get().familyFinanceInfo,
        situationDescriptions: get().situationDescriptions,
      }),

      resetFormData: () => {
        set({
          personalInformation: null,
          familyFinanceInfo: null,
          situationDescriptions: null,
          isPersonalInformationCompleted: false,
          isFamilyFinanceInfoCompleted: false,
        });
      },
    }),
    {
      name: 'financial-request-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        personalInformation: state.personalInformation,
        familyFinanceInfo: state.familyFinanceInfo,
        situationDescriptions: state.situationDescriptions,
        isPersonalInformationCompleted: state.isPersonalInformationCompleted,
        isFamilyFinanceInfoCompleted: state.isFamilyFinanceInfoCompleted,
      }),
      onRehydrateStorage: () => (state) => {
        // When store rehydration is complete, set hydration state to true
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
