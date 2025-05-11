import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { NumberOfDependents } from './number-of-dependents';

// Mock the next-intl hook
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      label: 'Number of Dependents',
      placeholder: '0',
    };
    const keyPart = key.split('.').pop() || '';
    return translations[keyPart] || key;
  },
}));

function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      numberOfDependents: 0,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('NumberOfDependents', () => {
  it('renders number of dependents field with label', () => {
    render(
      <FormWrapper>
        <NumberOfDependents />
      </FormWrapper>,
    );

    expect(screen.getByLabelText('Number of Dependents')).toBeInTheDocument();
  });

  it('displays placeholder text in the input field', () => {
    render(
      <FormWrapper>
        <NumberOfDependents />
      </FormWrapper>,
    );

    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('allows user to input a number of dependents value', async () => {
    const user = userEvent.setup();
    render(
      <FormWrapper>
        <NumberOfDependents />
      </FormWrapper>,
    );

    const inputElement = screen.getByLabelText('Number of Dependents');

    // Clear the input and type a new value
    await user.clear(inputElement);
    await user.type(inputElement, '3');

    // Verify the input value
    expect(inputElement).toHaveValue(3);
  });
});
