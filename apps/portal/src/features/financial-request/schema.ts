import { useTranslations } from 'next-intl';
import { z } from 'zod';

// Using a more generic function type for flexibility
export type TFunction = {
  (key: string, values?: Record<string, unknown>): string;
};

const MIN_STRING_LENGTH = 2;
const MAX_TEXTAREA_LENGTH = 2000;
const MIN_TEXTAREA_LENGTH = 50;

// --- Emirates ID Specific Validation ---
const emiratesIdRegex = /^784-\d{4}-\d{7}-\d{1}$/;

export const createEmiratesIdSchema = (t: TFunction) =>
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
export const personalInformationFormSchema = (t: TFunction) => {
  const emiratesIdSchema = createEmiratesIdSchema(t);

  return z.object({
    fullName: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: t('validation.minLength', {
          field: 'Full name',
          length: MIN_STRING_LENGTH,
        }),
      })
      .max(100, {
        message: t('validation.maxLength', { field: 'Full name', length: 100 }),
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
      required_error: t('validation.gender.required'),
      errorMap: () => ({ message: t('validation.gender.invalid') }),
    }),

    address: z
      .string({ required_error: t('validation.required') })
      .min(5, {
        message: t('validation.minLength', { field: 'Address', length: 5 }),
      })
      .max(200, {
        message: t('validation.maxLength', { field: 'Address', length: 200 }),
      })
      .trim(),

    city: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: t('validation.minLength', {
          field: 'City',
          length: MIN_STRING_LENGTH,
        }),
      })
      .max(50, {
        message: t('validation.maxLength', { field: 'City', length: 50 }),
      })
      .trim(),

    stateOrEmirate: z
      .string({ required_error: t('validation.required') })
      .min(MIN_STRING_LENGTH, {
        message: t('validation.minLength', {
          field: 'State/Emirate',
          length: MIN_STRING_LENGTH,
        }),
      })
      .max(50, {
        message: t('validation.maxLength', {
          field: 'State/Emirate',
          length: 50,
        }),
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
export const familyAndFinancialInfoFormSchema = (t: TFunction) =>
  z.object({
    maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed'], {
      required_error: t('validation.maritalStatus.required'),
      errorMap: () => ({ message: t('validation.maritalStatus.invalid') }),
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
        required_error: t('validation.employmentStatus.required'),
        errorMap: () => ({ message: t('validation.employmentStatus.invalid') }),
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
        required_error: t('validation.housingStatus.required'),
        errorMap: () => ({ message: t('validation.housingStatus.invalid') }),
      },
    ),
  });

export type FamilyAndFinancialInfoFormData = z.infer<
  ReturnType<typeof familyAndFinancialInfoFormSchema>
>;

// --- Step 3: Situation Descriptions Schema ---
export const situationDescriptionsFormSchema = (t: TFunction) =>
  z.object({
    currentFinancialSituation: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: t('validation.textarea.minLengthDetailed', {
          length: MIN_TEXTAREA_LENGTH,
        }),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: t('validation.textarea.maxLength', {
          length: MAX_TEXTAREA_LENGTH,
        }),
      })
      .trim(),

    employmentCircumstances: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: t('validation.textarea.minLengthDetailed', {
          length: MIN_TEXTAREA_LENGTH,
        }),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: t('validation.textarea.maxLength', {
          length: MAX_TEXTAREA_LENGTH,
        }),
      })
      .trim(),

    reasonForApplying: z
      .string({ required_error: t('validation.required') })
      .min(MIN_TEXTAREA_LENGTH, {
        message: t('validation.textarea.minLengthDetailed', {
          length: MIN_TEXTAREA_LENGTH,
        }),
      })
      .max(MAX_TEXTAREA_LENGTH, {
        message: t('validation.textarea.maxLength', {
          length: MAX_TEXTAREA_LENGTH,
        }),
      })
      .trim(),
  });

export type SituationDescriptionsFormData = z.infer<
  ReturnType<typeof situationDescriptionsFormSchema>
>;

export const createFinancialRequestSchema = (t: TFunction) =>
  personalInformationFormSchema(t)
    .merge(familyAndFinancialInfoFormSchema(t))
    .merge(situationDescriptionsFormSchema(t));

export type FinancialRequestFormData = z.infer<
  ReturnType<typeof createFinancialRequestSchema>
>;
