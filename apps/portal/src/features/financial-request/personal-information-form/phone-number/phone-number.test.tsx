import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { PhoneNumber } from './phone-number';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'label' ? 'Phone Number' : 'Enter your phone number',
}));

// Wrapper component with form context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: { phone: '' },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('PhoneNumber', () => {
  it('renders phone number input field correctly', () => {
    render(
      <FormWrapper>
        <PhoneNumber />
      </FormWrapper>,
    );

    const phoneLabel = screen.getByText('Phone Number');
    expect(phoneLabel).toBeInTheDocument();

    const phoneInput = screen.getByLabelText('Phone Number');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(phoneInput).toHaveAttribute(
      'placeholder',
      'Enter your phone number',
    );
  });

  it('allows typing into the phone number field', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <PhoneNumber />
      </FormWrapper>,
    );

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, '1234567890');

    expect(phoneInput).toHaveValue('1234567890');
  });
});
