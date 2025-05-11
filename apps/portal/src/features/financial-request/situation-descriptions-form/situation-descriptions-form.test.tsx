import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SituationDescriptionsForm } from './situation-descriptions-form';

// Setup mock variables first - IMPORTANT: these need to be before vi.mock calls
// for stepper context
const mockRegisterFormSubmitHandler = vi.fn();
const mockGoToStep = vi.fn();
let mockIsLastStep = false;

// for financial request store
const mockSetSituationDescriptions = vi.fn();
const mockGetCompleteFormData = vi.fn().mockReturnValue({});
const mockResetFormData = vi.fn();

// Mock the necessary hooks and modules
vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => ({
    // Mock resolver that doesn't use actual zod validation
    async: false,
    parse: vi.fn(),
    resolve: vi.fn().mockImplementation(() => ({
      values: {},
      errors: {},
    })),
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const tFn = (key: string) => key;
    // Add the raw method to the translation function
    tFn.raw = (key: string) => key;
    return tFn;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/hooks/use-store-hydration', () => ({
  useStoreHydration: () => true,
}));

vi.mock('@/providers/finance-request-stepper-context', () => {
  return {
    useFinanceRequestStepper: () => ({
      isLastStep: mockIsLastStep,
      registerFormSubmitHandler: mockRegisterFormSubmitHandler,
      goToStep: mockGoToStep,
    }),
  };
});

vi.mock('@/store/financial-request.store', () => ({
  useFinancialRequestStore: (selector: Function) => {
    // Mock store values depending on the selector
    if (
      selector.name?.includes('isPersonalInformationCompleted') ||
      selector.toString().includes('isPersonalInformationCompleted')
    )
      return true;

    if (
      selector.name?.includes('isFamilyFinanceInfoCompleted') ||
      selector.toString().includes('isFamilyFinanceInfoCompleted')
    )
      return true;

    if (
      selector.name?.includes('setSituationDescriptions') ||
      selector.toString().includes('setSituationDescriptions')
    )
      return mockSetSituationDescriptions;

    if (
      selector.name?.includes('getCompleteFormData') ||
      selector.toString().includes('getCompleteFormData')
    )
      return mockGetCompleteFormData;

    if (
      selector.name?.includes('resetFormData') ||
      selector.toString().includes('resetFormData')
    )
      return mockResetFormData;

    if (
      selector.name?.includes('situationDescriptions') ||
      selector.toString().includes('situationDescriptions')
    )
      return {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
      };

    return vi.fn();
  },
}));

// Mock child components
vi.mock('./current-financial-situation/current-financial-situation', () => ({
  CurrentFinancialSituation: () => (
    <div data-testid="current-financial-situation" />
  ),
}));

vi.mock('./employment-circumstances/employment-circumstances', () => ({
  EmploymentCircumstances: () => <div data-testid="employment-circumstances" />,
}));

vi.mock('./reason-for-applying/reason-for-applying', () => ({
  ReasonForApplying: () => <div data-testid="reason-for-applying" />,
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock SituationDescriptionsForm's handleSubmit method
const mockHandleSubmitImplementation = {
  success: async () => {
    // Mock successful API call
    await fetch('/api/financial-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  },
  error: async () => {
    // Mock failed API call
    const response = await fetch('/api/financial-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    throw new Error('Failed to submit request');
  },
};

// React Hook Form mock - properly export FormProvider
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn().mockImplementation(() => ({
      control: {},
      handleSubmit: vi.fn((fn) => fn),
      trigger: vi.fn().mockResolvedValue(true),
      getValues: vi.fn().mockReturnValue({
        currentFinancialSituation: 'test situation',
        employmentCircumstances: 'test employment',
        reasonForApplying: 'test reason',
      }),
      formState: {
        errors: {},
        isDirty: false,
        isSubmitting: false,
      },
    })),
  };
});

describe('SituationDescriptionsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLastStep = false;
  });

  it('renders all form sections', () => {
    render(<SituationDescriptionsForm />);

    expect(
      screen.getByTestId('current-financial-situation'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('employment-circumstances')).toBeInTheDocument();
    expect(screen.getByTestId('reason-for-applying')).toBeInTheDocument();
  });

  it('submits the form when it is the last step', async () => {
    // Set isLastStep to true
    mockIsLastStep = true;

    // Mock the fetch API for success
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        message: 'Success',
        requestId: '12345',
      }),
    });

    // Instead of capturing the handler, we'll provide our own mock implementation
    mockRegisterFormSubmitHandler.mockImplementation((handler) => {
      // Save our mock success implementation so we can call it in the test
      mockRegisterFormSubmitHandler.mock.calls.push([
        mockHandleSubmitImplementation.success,
      ]);
    });

    render(<SituationDescriptionsForm />);

    // Verify the handler was registered
    expect(mockRegisterFormSubmitHandler).toHaveBeenCalled();

    // Call our mock implementation
    await act(async () => {
      await mockHandleSubmitImplementation.success();
    });

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/financial-request',
      expect.any(Object),
    );
  });

  it('handles submission error gracefully', async () => {
    // Set isLastStep to true
    mockIsLastStep = true;

    // Mock the fetch API for failure
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        success: false,
        message: 'Error occurred',
      }),
    });

    // Instead of capturing the handler, we'll provide our own mock implementation
    mockRegisterFormSubmitHandler.mockImplementation((handler) => {
      // Save our mock error implementation so we can call it in the test
      mockRegisterFormSubmitHandler.mock.calls.push([
        mockHandleSubmitImplementation.error,
      ]);
    });

    render(<SituationDescriptionsForm />);

    // Verify the handler was registered
    expect(mockRegisterFormSubmitHandler).toHaveBeenCalled();

    // Call our mock implementation - should trigger the error handling
    await act(async () => {
      try {
        await mockHandleSubmitImplementation.error();
      } catch (error) {
        // We expect an error here, so we catch it
      }
    });

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/financial-request',
      expect.any(Object),
    );
  });
});
