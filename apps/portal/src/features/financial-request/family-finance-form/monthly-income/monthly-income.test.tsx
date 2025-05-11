import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { MonthlyIncome } from './monthly-income';

// Mock the next-intl hook
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      label: 'Monthly Income',
      placeholder: '0',
    };
    const keyPart = key.split('.').pop() || '';
    return translations[keyPart] || key;
  },
}));

function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      monthlyIncome: 0,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('MonthlyIncome', () => {
  it('renders monthly income field with label', () => {
    render(
      <FormWrapper>
        <MonthlyIncome />
      </FormWrapper>,
    );

    expect(screen.getByLabelText('Monthly Income')).toBeInTheDocument();
  });

  it('displays placeholder text in the input field', () => {
    render(
      <FormWrapper>
        <MonthlyIncome />
      </FormWrapper>,
    );

    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('allows user to input a monthly income value', async () => {
    const user = userEvent.setup();
    render(
      <FormWrapper>
        <MonthlyIncome />
      </FormWrapper>,
    );

    const inputElement = screen.getByLabelText('Monthly Income');

    // Clear the input and type a new value
    await user.clear(inputElement);
    await user.type(inputElement, '5000');

    // Verify the input value
    expect(inputElement).toHaveValue(5000);
  });
});
