import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Gender } from './gender';

// Create a mock state for testing
const selectValue = { current: '' };

// Mock state for tracking if select is open
const isSelectOpen = { current: false };

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
  FormMessage: () => <div data-testid="form-message" />,
  Select: ({ children, dir }: any) => (
    <div data-testid="select" data-dir={dir}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: any) => (
    <div data-testid={`select-item-${value}`}>{children}</div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: any) => (
    <div data-testid="select-value" data-placeholder={placeholder} />
  ),
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
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      label: 'Gender',
      placeholder: 'Select your gender',
      male: 'Male',
      female: 'Female',
    };
    return translations[key] || key;
  },
}));

// Mock the hooks
vi.mock('@/hooks/use-direction', () => ({
  useDirection: () => 'ltr',
}));

// Wrapper component to provide form context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      gender: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('Gender', () => {
  beforeEach(() => {
    // Reset state before each test
    selectValue.current = '';
    isSelectOpen.current = false;
  });

  it('renders with correct label', () => {
    render(
      <FormWrapper>
        <Gender />
      </FormWrapper>,
    );

    expect(screen.getByText('Gender')).toBeInTheDocument();
  });

  it('renders select with placeholder', () => {
    render(
      <FormWrapper>
        <Gender />
      </FormWrapper>,
    );

    expect(screen.getByTestId('select-value')).toHaveAttribute(
      'data-placeholder',
      'Select your gender',
    );
  });

  it('renders male and female options', () => {
    render(
      <FormWrapper>
        <Gender />
      </FormWrapper>,
    );

    expect(screen.getByTestId('select-item-male')).toHaveTextContent('Male');
    expect(screen.getByTestId('select-item-female')).toHaveTextContent(
      'Female',
    );
  });

  it('uses correct direction', () => {
    render(
      <FormWrapper>
        <Gender />
      </FormWrapper>,
    );

    // Check that the direction attribute is set correctly
    expect(screen.getByTestId('select')).toHaveAttribute('data-dir', 'ltr');
  });
});
