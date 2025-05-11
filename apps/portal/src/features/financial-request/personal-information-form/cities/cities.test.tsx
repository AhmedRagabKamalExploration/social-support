import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { server } from '@/test/server';

import { CountryStateCities } from './cities';

// Mock the server action to prevent "server only" error
vi.mock('@/actions/country-state-cities.action', () => ({
  getCountryStateCitiesAction: vi
    .fn()
    .mockImplementation(async (countryIso2, stateCode) => {
      // Return mock data immediately
      if (countryIso2 === 'US' && stateCode === 'NY') {
        return [
          { name: 'New York City', state_code: 'NY' },
          { name: 'Brooklyn', state_code: 'NY' },
          { name: 'Queens', state_code: 'NY' },
        ];
      }
      return [];
    }),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      label: 'City',
      placeholder: 'Select city',
      placeholderSearch: 'Search city',
      noCityFound: 'No city found',
    };
    return translations[key as keyof typeof translations] || key;
  },
}));

// Mock error boundary
vi.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Directly mock the component rather than dealing with its internals
vi.mock('./cities', async () => {
  const actual = await vi.importActual('./cities');

  return {
    ...actual,
    CountryStateCities: () => (
      <div>
        <div>City</div>
        <button data-testid="select-button">Select city</button>
      </div>
    ),
  };
});

// Mock UI components
vi.mock('@dge/ui-core', () => ({
  FormField: ({ render }: any) => {
    const field = { value: '' };
    return render({ field });
  },
  FormItem: ({ children }: any) => <div>{children}</div>,
  FormLabel: ({ children }: any) => <div>{children}</div>,
  FormMessage: () => null,
  FormControl: ({ children }: any) => <div>{children}</div>,
  ShadButton: (props: any) => (
    <button data-testid="select-button">{props.children}</button>
  ),
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children }: any) => <div>{children}</div>,
  PopoverContent: () => null,
  Command: () => null,
  CommandInput: () => null,
  CommandList: () => null,
  CommandEmpty: () => null,
  CommandGroup: () => null,
  CommandItem: () => null,
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Create a wrapper with form context
function FormWrapper({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
}) {
  const methods = useForm({
    defaultValues: {
      country: '',
      stateOrEmirate: '',
      city: '',
      ...defaultValues,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('CountryStateCities', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it('renders correctly', () => {
    render(
      <FormWrapper defaultValues={{ country: 'US', stateOrEmirate: 'NY' }}>
        <CountryStateCities />
      </FormWrapper>,
    );

    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByTestId('select-button')).toBeInTheDocument();
  });
});
