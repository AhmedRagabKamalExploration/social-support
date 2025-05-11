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
import type { Country, CountryResponse } from '@/types/country.type';

import { CountriesWrapper } from './countries-wrapper';

// Mock the Countries component
vi.mock('../countries/countries', () => ({
  Countries: ({
    countries,
    isLoading,
  }: {
    countries: Country[];
    isLoading: boolean;
  }) => (
    <div data-testid="mock-countries">
      <span>Countries Component</span>
      <span data-testid="countries-count">{countries.length}</span>
      <span data-testid="is-loading">{isLoading.toString()}</span>
    </div>
  ),
}));

// Mock the use hook from React
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...(actual as any),
    use: (promise: Promise<any>) => {
      // For testing, immediately return the mock data
      return {
        list: [
          {
            id: 1,
            name: 'United Arab Emirates',
            iso2: 'AE',
            iso3: 'ARE',
            emoji: '🇦🇪',
            translations: { fa: 'امارات متحده عربی' },
          },
          {
            id: 2,
            name: 'United States',
            iso2: 'US',
            iso3: 'USA',
            emoji: '🇺🇸',
            translations: { fa: 'ایالات متحده آمریکا' },
          },
        ],
        total: 2,
      };
    },
  };
});

// Wrapper component with form context
function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      country: '',
      stateOrEmirate: '',
      city: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('CountriesWrapper', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders Countries component with data from the promise', () => {
    // Create a mock promise
    const mockPromise = Promise.resolve({} as CountryResponse);

    render(
      <FormWrapper>
        <CountriesWrapper countriesPromise={mockPromise} />
      </FormWrapper>,
    );

    // Verify that Countries component is rendered with the correct props
    expect(screen.getByTestId('mock-countries')).toBeInTheDocument();
    expect(screen.getByText('Countries Component')).toBeInTheDocument();
    expect(screen.getByTestId('countries-count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
  });

  it('passes isLoading prop correctly', () => {
    // Create a mock promise
    const mockPromise = Promise.resolve({} as CountryResponse);

    render(
      <FormWrapper>
        <CountriesWrapper countriesPromise={mockPromise} isLoading />
      </FormWrapper>,
    );

    // Verify isLoading prop is passed correctly
    expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
  });
});
