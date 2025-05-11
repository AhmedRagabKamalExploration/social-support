import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { Email } from './email';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'label' ? 'Email' : 'Enter your email',
}));

// Wrapper component with form context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: { email: '' },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('Email', () => {
  it('renders email input field correctly', () => {
    render(
      <FormWrapper>
        <Email />
      </FormWrapper>,
    );

    const emailLabel = screen.getByText('Email');
    expect(emailLabel).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
  });

  it('allows typing into the email field', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <Email />
      </FormWrapper>,
    );

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });
});
