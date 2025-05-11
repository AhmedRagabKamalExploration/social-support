import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NationalId } from './national-id';

// Mock the formatNationalId utility
const mockFormatNationalId = vi.fn((value) =>
  value.replace(/\D/g, '').slice(0, 10),
);
vi.mock('@/utils/format-national-id', () => ({
  formatNationalId: (value: string) => mockFormatNationalId(value),
}));

// Mock the UI components
vi.mock('@dge/ui-core', () => ({
  FormControl: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  FormField: ({ render, name, control }: any) => {
    // Just pass through to the render function with a mock field object
    return render({
      field: {
        name,
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
      },
    });
  },
  FormItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  FormLabel: ({ children }: { children: React.ReactNode }) => (
    <label>{children}</label>
  ),
  FormMessage: () => <div data-testid="form-message"></div>,
  Input: (props: any) => <input data-testid="national-id-input" {...props} />,
}));

// Mock react-hook-form
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useFormContext: () => ({
      control: {},
      formState: { errors: {} },
    }),
  };
});

// Mock the translations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'label' ? 'National ID' : 'Enter your National ID',
}));

// Setup the form provider with real react-hook-form
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      nationalId: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('NationalId', () => {
  beforeEach(() => {
    mockFormatNationalId.mockClear();
  });

  it('renders with correct label', () => {
    render(
      <FormWrapper>
        <NationalId />
      </FormWrapper>,
    );

    expect(screen.getByText('National ID')).toBeInTheDocument();
  });

  it('renders input with correct placeholder', () => {
    render(
      <FormWrapper>
        <NationalId />
      </FormWrapper>,
    );

    expect(screen.getByTestId('national-id-input')).toHaveAttribute(
      'placeholder',
      'Enter your National ID',
    );
  });

  it('has onChange handler that formats input', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <NationalId />
      </FormWrapper>,
    );

    const input = screen.getByTestId('national-id-input');
    await user.type(input, 'ABC123');

    // Just check that our formatting function was called
    expect(mockFormatNationalId).toHaveBeenCalled();
  });
});
