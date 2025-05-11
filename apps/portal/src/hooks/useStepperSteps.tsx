import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const useStepperSteps = () => {
  const t = useTranslations('FinancialRequestStepper.steps');
  return useMemo(() => {
    return [
      {
        id: 'personal-information',
        title: t('personalInformation'),
        path: '/financial-request/personal-information',
        fields: [
          'fullName',
          'nationalId',
          'dateOfBirth',
          'gender',
          'address',
          'city',
          'stateOrEmirate',
          'country',
          'phone',
          'email',
        ],
      },
      {
        id: 'family-finance-info',
        title: t('familyFinanceInfo'),
        path: '/financial-request/family-finance-info',
        fields: [
          'maritalStatus',
          'numberOfDependents',
          'employmentStatus',
          'monthlyIncome',
          'housingStatus',
        ],
      },
      {
        id: 'situation-descriptions',
        title: t('situationDescription'),
        path: '/financial-request/situation-descriptions',
        fields: [
          'currentFinancialSituation',
          'employmentCircumstances',
          'reasonForApplying',
        ],
      },
    ];
  }, []);
};

export type UseStepperSteps = ReturnType<typeof useStepperSteps>;
