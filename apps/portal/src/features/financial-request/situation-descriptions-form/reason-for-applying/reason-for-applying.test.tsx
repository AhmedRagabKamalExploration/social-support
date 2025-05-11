import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { ReasonForApplying } from './reason-for-applying';

// Mock necessary hooks and components
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/store/financial-request.store', () => ({
  useFinancialRequestStore: (selector: Function) => {
    if (selector.name.includes('personalInformation')) {
      return {
        fullName: 'John Doe',
      };
    }
    return {
      familyFinanceInfo: {
        employmentStatus: 'unemployed',
        monthlyIncome: 0,
        numberOfDependents: 2,
        maritalStatus: 'married',
      },
    };
  },
}));

vi.mock('../help-me-write/help-me-write', () => ({
  default: () => <button data-testid="help-me-write">Help Me Write</button>,
}));

// Wrapper component to provide FormProvider context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      reasonForApplying: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('ReasonForApplying', () => {
  it('renders the component correctly', () => {
    render(
      <FormWrapper>
        <ReasonForApplying />
      </FormWrapper>,
    );

    // Check if textarea and help button are rendered
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('help-me-write')).toBeInTheDocument();
  });

  it('allows user to input text', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <ReasonForApplying />
      </FormWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const testText =
      'I am applying for financial support due to my current unemployment situation.';

    await user.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  });
});
