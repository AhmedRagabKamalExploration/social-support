import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PersonalInformationForm } from './personal-information-form';

// Mock react-hook-form at the top level
const mockTrigger = vi.fn();
const mockGetValues = vi.fn();
const mockReset = vi.fn();

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    trigger: mockTrigger,
    getValues: mockGetValues,
    reset: mockReset,
    control: {},
  }),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the hooks and providers
vi.mock('next-intl', () => ({
  useTranslations: () => ({
    raw: (key: string) => key,
  }),
}));

vi.mock('@/hooks/use-store-hydration', () => ({
  useStoreHydration: () => true,
}));

// Mock the stepper context
const mockRegisterFormSubmitHandler = vi.fn();
vi.mock('@/providers/finance-request-stepper-context', () => ({
  useFinanceRequestStepper: () => ({
    registerFormSubmitHandler: mockRegisterFormSubmitHandler,
  }),
}));

// Mock the store
const mockSetPersonalInformation = vi.fn();
const mockSetPersonalInformationCompleted = vi.fn();
let mockPersonalInformation = {
  fullName: '',
  nationalId: '',
  dateOfBirth: '',
  gender: undefined,
  address: '',
  city: '',
  stateOrEmirate: '',
  country: '',
  phone: '',
  email: '',
};
let mockIsPersonalInformationCompleted = false;

vi.mock('@/store/financial-request.store', () => ({
  useFinancialRequestStore: (selector: Function) => {
    const state = {
      personalInformation: mockPersonalInformation,
      isPersonalInformationCompleted: mockIsPersonalInformationCompleted,
      setPersonalInformation: mockSetPersonalInformation,
      setPersonalInformationCompleted: mockSetPersonalInformationCompleted,
    };
    return selector(state);
  },
}));

// Mock child components
vi.mock('./fullname/fullname', () => ({
  FullName: () => (
    <div data-testid="fullname-component">Full Name Component</div>
  ),
}));

vi.mock('./national-id/national-id', () => ({
  NationalId: () => (
    <div data-testid="national-id-component">National ID Component</div>
  ),
}));

vi.mock('./date-of-birth/date-of-birth', () => ({
  DateOfBirth: () => (
    <div data-testid="date-of-birth-component">Date of Birth Component</div>
  ),
}));

vi.mock('./gender/gender', () => ({
  Gender: () => <div data-testid="gender-component">Gender Component</div>,
}));

vi.mock('./address/address', () => ({
  Address: () => <div data-testid="address-component">Address Component</div>,
}));

vi.mock('./states/states', () => ({
  CountryStates: () => (
    <div data-testid="states-component">States Component</div>
  ),
}));

vi.mock('./cities/cities', () => ({
  CountryStateCities: () => (
    <div data-testid="cities-component">Cities Component</div>
  ),
}));

vi.mock('./phone-number/phone-number', () => ({
  PhoneNumber: () => (
    <div data-testid="phone-number-component">Phone Number Component</div>
  ),
}));

vi.mock('./email/email', () => ({
  Email: () => <div data-testid="email-component">Email Component</div>,
}));

describe('PersonalInformationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPersonalInformation = {
      fullName: '',
      nationalId: '',
      dateOfBirth: '',
      gender: undefined,
      address: '',
      city: '',
      stateOrEmirate: '',
      country: '',
      phone: '',
      email: '',
    };
    mockIsPersonalInformationCompleted = false;
  });

  it('renders all form components', () => {
    render(
      <PersonalInformationForm>
        <div data-testid="children-content">Test Children Content</div>
      </PersonalInformationForm>,
    );

    // Check if all components are rendered
    expect(screen.getByTestId('fullname-component')).toBeInTheDocument();
    expect(screen.getByTestId('national-id-component')).toBeInTheDocument();
    expect(screen.getByTestId('date-of-birth-component')).toBeInTheDocument();
    expect(screen.getByTestId('gender-component')).toBeInTheDocument();
    expect(screen.getByTestId('address-component')).toBeInTheDocument();
    expect(screen.getByTestId('children-content')).toBeInTheDocument();
    expect(screen.getByTestId('states-component')).toBeInTheDocument();
    expect(screen.getByTestId('cities-component')).toBeInTheDocument();
    expect(screen.getByTestId('phone-number-component')).toBeInTheDocument();
    expect(screen.getByTestId('email-component')).toBeInTheDocument();
  });

  it('sets form data in store when window is about to unload', async () => {
    render(
      <PersonalInformationForm>
        <div>Child content</div>
      </PersonalInformationForm>,
    );

    // Simulate the beforeunload event
    const beforeUnloadEvent = new Event('beforeunload');
    globalThis.dispatchEvent(beforeUnloadEvent);

    // Verify store functions were called
    expect(mockSetPersonalInformation).toHaveBeenCalled();
  });

  it('registers form submit handler with stepper context', () => {
    render(
      <PersonalInformationForm>
        <div>Child content</div>
      </PersonalInformationForm>,
    );

    // Verify the submit handler was registered
    expect(mockRegisterFormSubmitHandler).toHaveBeenCalled();
  });

  it('resets the completed flag when mounted with empty data', () => {
    render(
      <PersonalInformationForm>
        <div>Child content</div>
      </PersonalInformationForm>,
    );

    // Verify store function was called
    expect(mockSetPersonalInformationCompleted).toHaveBeenCalledWith(false);
  });

  it('resets form with saved data when store is hydrated', async () => {
    // Set up store with saved data for this test
    mockPersonalInformation = {
      fullName: 'John Doe',
      nationalId: '1234567890',
      dateOfBirth: '1990-01-01',
      gender: 'male' as any,
      address: '123 Main St',
      city: 'City',
      stateOrEmirate: 'State',
      country: 'Country',
      phone: '1234567890',
      email: 'john@example.com',
    };

    render(
      <PersonalInformationForm>
        <div>Child content</div>
      </PersonalInformationForm>,
    );

    // Verify store function was called to mark the form as completed
    await waitFor(() => {
      expect(mockSetPersonalInformationCompleted).toHaveBeenCalledWith(true);
    });
    expect(mockReset).toHaveBeenCalledWith(mockPersonalInformation);
  });

  it('calls handleSubmit with valid form data when triggered', async () => {
    // Setup mock for successful validation
    mockTrigger.mockResolvedValue(true);
    mockGetValues.mockReturnValue({
      fullName: 'John Doe',
      nationalId: '1234567890',
      dateOfBirth: '1990-01-01',
      gender: 'male' as any,
      address: '123 Main St',
      city: 'City',
      stateOrEmirate: 'State',
      country: 'Country',
      phone: '1234567890',
      email: 'test@example.com',
    });

    // Setup the form submit handler capture
    let capturedSubmitHandler: (() => Promise<boolean>) | undefined;
    mockRegisterFormSubmitHandler.mockImplementation((handler) => {
      capturedSubmitHandler = handler;
    });

    render(
      <PersonalInformationForm>
        <div>Child content</div>
      </PersonalInformationForm>,
    );

    // Ensure the handler was captured
    expect(capturedSubmitHandler).toBeDefined();

    // Call the captured submit handler
    const result = await capturedSubmitHandler!();

    // Verify results
    expect(mockTrigger).toHaveBeenCalled();
    expect(mockGetValues).toHaveBeenCalled();
    expect(mockSetPersonalInformation).toHaveBeenCalled();
    expect(mockSetPersonalInformationCompleted).toHaveBeenCalledWith(true);
    expect(result).toBe(true);
  });
});
