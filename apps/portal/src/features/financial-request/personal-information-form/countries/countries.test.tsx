import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import type { Country } from '@/types/country.type';

import { Countries } from './countries';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      label: 'Country',
      placeholder: 'Select country',
      placeholderSearch: 'Search country',
      noCountryFound: 'No country found',
    };
    return translations[key as keyof typeof translations] || key;
  },
}));

// Sample countries data
const mockCountries: Country[] = [
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
  {
    id: 3,
    name: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    emoji: '🇬🇧',
    translations: { fa: 'بریتانیا' },
  },
];

// Wrapper component with form context
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

describe('Countries', () => {
  it('renders loading skeleton when isLoading is true', () => {
    render(
      <FormWrapper>
        <Countries countries={[]} isLoading={true} />
      </FormWrapper>,
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    // We can't test for the actual skeleton component easily, but we can verify
    // that the dropdown trigger isn't rendered when loading
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('renders the countries dropdown when not loading', () => {
    render(
      <FormWrapper>
        <Countries countries={mockCountries} isLoading={false} />
      </FormWrapper>,
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('Select country');
  });

  it('shows country list and allows selection', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <Countries countries={mockCountries} isLoading={false} />
      </FormWrapper>,
    );

    // Open the dropdown
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    // Verify countries are displayed
    await waitFor(() => {
      expect(screen.getByText('United Arab Emirates')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });

    // Select a country
    await user.click(screen.getByText('United States'));

    // Verify selection is displayed in the combobox
    await waitFor(() => {
      expect(combobox).toHaveTextContent('United States');
    });
  });

  it('allows searching for countries', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <Countries countries={mockCountries} isLoading={false} />
      </FormWrapper>,
    );

    // Open the dropdown
    await user.click(screen.getByRole('combobox'));

    // Type in the search box
    const searchInput = screen.getByPlaceholderText('Search country');
    await user.type(searchInput, 'United');

    // Verify filtered results
    await waitFor(() => {
      expect(screen.getByText('United Arab Emirates')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });

    // Type more specific search
    await user.clear(searchInput);
    await user.type(searchInput, 'States');

    // Verify more filtered results
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(
        screen.queryByText('United Arab Emirates'),
      ).not.toBeInTheDocument();
    });
  });

  it('shows selected country with emoji when a country is already selected', () => {
    render(
      <FormWrapper defaultValues={{ country: 'US' }}>
        <Countries countries={mockCountries} isLoading={false} />
      </FormWrapper>,
    );

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveTextContent('🇺🇸');
    expect(combobox).toHaveTextContent('United States');
  });
});
