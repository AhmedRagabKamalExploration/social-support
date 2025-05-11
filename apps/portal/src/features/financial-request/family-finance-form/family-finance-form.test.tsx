import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FamilyFinanceForm } from './family-finance-form';

// // Mock child components
vi.mock('./marital-status/marital-status', () => ({
  MaritalStatus: () => (
    <div data-testid="marital-status">Marital Status Component</div>
  ),
}));

vi.mock('./number-of-dependents/number-of-dependents', () => ({
  NumberOfDependents: () => (
    <div data-testid="number-of-dependents">Number of Dependents Component</div>
  ),
}));

vi.mock('./employment-status/employment-status', () => ({
  EmploymentStatus: () => (
    <div data-testid="employment-status">Employment Status Component</div>
  ),
}));

vi.mock('./monthly-income/monthly-income', () => ({
  MonthlyIncome: () => (
    <div data-testid="monthly-income">Monthly Income Component</div>
  ),
}));

vi.mock('./housing-status/housing-status', () => ({
  HousingStatus: () => (
    <div data-testid="housing-status">Housing Status Component</div>
  ),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock useParams
vi.mock('next/navigation', () => ({
  useParams: () => ({
    locale: 'en',
  }),
}));

vi.mock('@/providers/finance-request-stepper-context', () => ({
  useFinanceRequestStepper: () => ({
    registerFormSubmitHandler: vi.fn(),
    goToStep: vi.fn(),
  }),
}));

describe('FamilyFinanceForm', () => {
  it('renders all form components', () => {
    render(<FamilyFinanceForm />);

    expect(screen.getByTestId('marital-status')).toBeInTheDocument();
    expect(screen.getByTestId('number-of-dependents')).toBeInTheDocument();
    expect(screen.getByTestId('employment-status')).toBeInTheDocument();
    expect(screen.getByTestId('monthly-income')).toBeInTheDocument();
    expect(screen.getByTestId('housing-status')).toBeInTheDocument();
  });
});
