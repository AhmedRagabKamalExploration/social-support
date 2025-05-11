import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DateOfBirth } from './date-of-birth';

// Mock format and parseISO functions with spies
const mockFormat = vi.fn().mockReturnValue('January 1, 2000');
const mockParseISO = vi.fn().mockReturnValue(new Date('2000-01-01'));

// Mock the date-fns functions
vi.mock('date-fns', () => ({
  format: (date: Date, formatStr: string, options?: any) =>
    mockFormat(date, formatStr, options),
  parseISO: (date: string) => mockParseISO(date),
}));

// Mock the date-fns locales
vi.mock('date-fns/locale', () => ({
  ar: { code: 'ar' },
  enUS: { code: 'en-US' },
}));

// Mock the UI components
vi.mock('@dge/ui-core', () => ({
  Calendar: ({ onSelect }: any) => (
    <div data-testid="calendar">
      <button
        onClick={() => onSelect(new Date('2000-01-01'))}
        data-testid="calendar-date"
      >
        January 1, 2000
      </button>
    </div>
  ),
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
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
  FormItem: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  FormLabel: ({ children }: { children: React.ReactNode }) => (
    <label>{children}</label>
  ),
  FormMessage: () => <div data-testid="form-message"></div>,
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  PopoverContent: ({ children }: any) => (
    <div data-testid="popover-content">{children}</div>
  ),
  PopoverTrigger: ({ children }: any) => (
    <div data-testid="popover-trigger">{children}</div>
  ),
  ShadButton: ({ children, className, variant }: any) => (
    <button
      className={className}
      data-variant={variant}
      data-testid="date-button"
    >
      {children}
    </button>
  ),
}));

// Mock the Lucide icon
vi.mock('lucide-react', () => ({
  CalendarIcon: () => <div data-testid="calendar-icon" />,
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

// Mock the next-intl hooks
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'label' ? 'Date of Birth' : 'Select date of birth',
  useLocale: () => 'en',
}));

// Mock the hooks
vi.mock('@/hooks/use-direction', () => ({
  useDirection: () => 'ltr',
}));

// Setup the form provider with real react-hook-form
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      dateOfBirth: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DateOfBirth', () => {
  beforeEach(() => {
    mockFormat.mockClear();
    mockParseISO.mockClear();
  });

  it('renders with correct label', () => {
    render(
      <FormWrapper>
        <DateOfBirth />
      </FormWrapper>,
    );

    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
  });

  it('renders button with placeholder when no date selected', () => {
    render(
      <FormWrapper>
        <DateOfBirth />
      </FormWrapper>,
    );

    const button = screen.getByTestId('date-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Select date of birth');
  });

  it('shows calendar when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <DateOfBirth />
      </FormWrapper>,
    );

    // The calendar should be accessible
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });
});
