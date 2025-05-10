import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type PersonalInformationFormData } from '@/features/financial-request/schema';
import { type FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';
import { type SituationDescriptionsFormData } from '@/features/financial-request/schema';

export type FinancialRequestState = {
  personalInformation: PersonalInformationFormData | null;
  familyFinanceInfo: FamilyAndFinancialInfoFormData | null;
  situationDescriptions: SituationDescriptionsFormData | null;

  setPersonalInformation: (data: PersonalInformationFormData) => void;
  setFamilyFinanceInfo: (data: FamilyAndFinancialInfoFormData) => void;
  setSituationDescriptions: (data: SituationDescriptionsFormData) => void;

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

      setPersonalInformation: (data) => set({ personalInformation: data }),
      setFamilyFinanceInfo: (data) => set({ familyFinanceInfo: data }),
      setSituationDescriptions: (data) => set({ situationDescriptions: data }),

      getCompleteFormData: () => ({
        personalInformation: get().personalInformation,
        familyFinanceInfo: get().familyFinanceInfo,
        situationDescriptions: get().situationDescriptions,
      }),

      resetFormData: () =>
        set({
          personalInformation: null,
          familyFinanceInfo: null,
          situationDescriptions: null,
        }),
    }),
    {
      name: 'financial-request-storage',
      partialize: (state) => ({
        personalInformation: state.personalInformation,
        familyFinanceInfo: state.familyFinanceInfo,
        situationDescriptions: state.situationDescriptions,
      }),
    },
  ),
);
