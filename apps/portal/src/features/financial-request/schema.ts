import { z } from 'zod';

const MIN_STRING_LENGTH = 2;
const MAX_TEXTAREA_LENGTH = 2000;
const MIN_TEXTAREA_LENGTH = 50;

// --- Emirates ID Specific Validation ---
const emiratesIdRegex = /^784-\d{4}-\d{7}-\d{1}$/;

// Helper function to safely get translation or use fallback
const safeTranslate = (
  t: any,
  key: string,
  values?: Record<string, unknown>,
  fallback?: string,
) => {
  try {
    return t(key, values);
  } catch (error) {
    // Use fallback message or generate one from the values
    if (fallback) return fallback;

    if (key.includes('minLength') && values) {
      return `${values.field} must be at least ${values.length} characters.`;
    }
    if (key.includes('maxLength') && values) {
      return `${values.field} cannot exceed ${values.length} characters.`;
    }

    return key.split('.').pop() || key;
  }
};

export const createEmiratesIdSchema = (t: any) =>
  z
    .string({ required_error: t('validation.eid.required') })
    .min(1, { message: t('validation.eid.required') })
    .regex(emiratesIdRegex, { message: t('validation.eid.format') })
    .refine(
      (eid) => {
        const yearPart = eid.substring(4, 8);
        const year = parseInt(yearPart, 10);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
      {
        message: t('validation.eid.year'),
      },
    );

// --- Step 1: Personal Information Schema ---
export const personalInformationFormSchema = (t: any) => {
  const emiratesIdSchema = createEmiratesIdSchema(t);

  return z.object({
    fullName: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: safeTranslate(
          t,
          'validation.minLength',
          { field: 'Full name', length: MIN_STRING_LENGTH },
          `Full name must be at least ${MIN_STRING_LENGTH} characters.`,
        ),
      })
      .max(100, {
        message: safeTranslate(
          t,
          'validation.maxLength',
          { field: 'Full name', length: 100 },
          'Full name cannot exceed 100 characters.',
        ),
      })
      .trim(),

    nationalId: emiratesIdSchema,

    dateOfBirth: z
      .string({ required_error: t('validation.dob.required') })
      .min(1, { message: t('validation.dob.required') })
      .refine(
        (dateStr) => {
          const date = new Date(dateStr);
          return (
            !isNaN(date.getTime()) &&
            date < new Date() &&
            date.getFullYear() >= 1900
          );
        },
        {
          message: t('validation.dob.invalidPast'),
        },
      ),

    gender: z.enum(['Male', 'Female'], {
      message: t('validation.gender.invalid'),
    }),

    address: z
      .string({ required_error: t('validation.required') })
      .min(5, {
        message: safeTranslate(
          t,
          'validation.minLength',
          { field: 'Address', length: 5 },
          'Address must be at least 5 characters.',
        ),
      })
      .max(200, {
        message: safeTranslate(
          t,
          'validation.maxLength',
          { field: 'Address', length: 200 },
          'Address cannot exceed 200 characters.',
        ),
      })
      .trim(),

    city: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: safeTranslate(
          t,
          'validation.minLength',
          { field: 'City', length: MIN_STRING_LENGTH },
          `City must be at least ${MIN_STRING_LENGTH} characters.`,
        ),
      })
      .max(50, {
        message: safeTranslate(
          t,
          'validation.maxLength',
          { field: 'City', length: 50 },
          'City cannot exceed 50 characters.',
        ),
      })
      .trim(),

    stateOrEmirate: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: safeTranslate(
          t,
          'validation.minLength',
          { field: 'State/Emirate', length: MIN_STRING_LENGTH },
          `State/Emirate must be at least ${MIN_STRING_LENGTH} characters.`,
        ),
      })
      .max(50, {
        message: safeTranslate(
          t,
          'validation.maxLength',
          { field: 'State/Emirate', length: 50 },
          'State/Emirate cannot exceed 50 characters.',
        ),
      })
      .trim(),

    country: z
      .string({ required_error: t('validation.country.required') })
      .min(1, { message: t('validation.country.required') }),

    phone: z
      .string({ required_error: t('validation.phone.required') })
      .min(1, { message: t('validation.phone.required') })
      .regex(/^\+971\s?(\d{2}\s?\d{3}\s?\d{4}|\d{9})$/, {
        message: t('validation.phone.invalidFormatUAE'),
      }),

    email: z
      .string({ required_error: t('validation.required') })
      .min(1, { message: t('validation.required') })
      .email({ message: t('validation.invalidEmail') })
      .trim()
      .toLowerCase(),
  });
};

export type PersonalInformationFormData = z.infer<
  ReturnType<typeof personalInformationFormSchema>
>;

// --- Step 2: Family & Financial Info Schema ---
export const familyAndFinancialInfoFormSchema = (t: any) =>
  z.object({
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed'], {
      message: t('validation.maritalStatus.invalid'),
    }),

    numberOfDependents: z
      .number({
        required_error: t('validation.dependents.required'),
        invalid_type_error: t('validation.dependents.mustBeNumber'),
      })
      .int({ message: t('validation.dependents.mustBeInteger') })
      .nonnegative({ message: t('validation.dependents.nonNegative') })
      .max(20, { message: t('validation.dependents.tooHigh') }),

    employmentStatus: z.enum(
      ['Employed', 'Unemployed', 'Student', 'Retired', 'Homemaker', 'Other'],
      {
        message: t('validation.employmentStatus.invalid'),
      },
    ),

    monthlyIncome: z
      .number({
        required_error: t('validation.monthlyIncome.required'),
        invalid_type_error: t('validation.monthlyIncome.mustBeNumber'),
      })
      .nonnegative({ message: t('validation.monthlyIncome.nonNegative') })
      .max(10000000, { message: t('validation.monthlyIncome.tooHigh') }),

    housingStatus: z.enum(
      ['Own', 'Rent', 'Living with Family', 'Mortgaged', 'Other'],
      {
        message: t('validation.housingStatus.invalid'),
      },
    ),
  });

export type FamilyAndFinancialInfoFormData = z.infer<
  ReturnType<typeof familyAndFinancialInfoFormSchema>
>;

// --- Step 3: Situation Descriptions Schema ---
export const situationDescriptionsFormSchema = (t: any) =>
  z.object({
    currentFinancialSituation: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.minLengthDetailed',
          { length: MIN_TEXTAREA_LENGTH },
          `Please provide a more detailed description (at least ${MIN_TEXTAREA_LENGTH} characters).`,
        ),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.maxLength',
          { length: MAX_TEXTAREA_LENGTH },
          `Description cannot exceed ${MAX_TEXTAREA_LENGTH} characters.`,
        ),
      })
      .trim(),

    employmentCircumstances: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.minLengthDetailed',
          { length: MIN_TEXTAREA_LENGTH },
          `Please provide a more detailed description (at least ${MIN_TEXTAREA_LENGTH} characters).`,
        ),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.maxLength',
          { length: MAX_TEXTAREA_LENGTH },
          `Description cannot exceed ${MAX_TEXTAREA_LENGTH} characters.`,
        ),
      })
      .trim(),

    reasonForApplying: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.minLengthDetailed',
          { length: MIN_TEXTAREA_LENGTH },
          `Please provide a more detailed description (at least ${MIN_TEXTAREA_LENGTH} characters).`,
        ),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: safeTranslate(
          t,
          'validation.textarea.maxLength',
          { length: MAX_TEXTAREA_LENGTH },
          `Description cannot exceed ${MAX_TEXTAREA_LENGTH} characters.`,
        ),
      })
      .trim(),
  });

export type SituationDescriptionsFormData = z.infer<
  ReturnType<typeof situationDescriptionsFormSchema>
>;

export const createFinancialRequestSchema = (t: any) =>
  personalInformationFormSchema(t)
    .merge(familyAndFinancialInfoFormSchema(t))
    .merge(situationDescriptionsFormSchema(t));

export type FinancialRequestFormData = z.infer<
  ReturnType<typeof createFinancialRequestSchema>
>;
