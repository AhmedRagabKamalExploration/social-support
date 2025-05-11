import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { CurrentFinancialSituation } from './current-financial-situation';

// Mock necessary hooks and components
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/store/financial-request.store', () => ({
  useFinancialRequestStore: () => ({
    familyFinanceInfo: {
      employmentStatus: 'employed',
      monthlyIncome: 5000,
      housingStatus: 'rent',
      maritalStatus: 'single',
      numberOfDependents: 2,
    },
  }),
}));

vi.mock('../help-me-write/help-me-write', () => ({
  default: () => <button data-testid="help-me-write">Help Me Write</button>,
}));

// Wrapper component to provide FormProvider context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      currentFinancialSituation: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('CurrentFinancialSituation', () => {
  it('renders the component correctly', () => {
    render(
      <FormWrapper>
        <CurrentFinancialSituation />
      </FormWrapper>,
    );

    // Check if the label is rendered
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('help-me-write')).toBeInTheDocument();
  });

  it('allows user to input text', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <CurrentFinancialSituation />
      </FormWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const testText = 'My current financial situation is stable.';

    await user.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  });
});
