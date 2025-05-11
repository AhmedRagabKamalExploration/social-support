'use client';

import {
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ShadButton,
  cn,
} from '@dge/ui-core';
import { format, parseISO } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import type { PersonalInformationFormData } from '@/features/financial-request/schema';

export function DateOfBirth() {
  const { control } = useFormContext<PersonalInformationFormData>();
  const locale = useLocale();
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.DateOfBirth',
  );

  const dateLocale = locale === 'ar' ? ar : enUS;

  return (
    <FormField
      control={control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t('label')}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <ShadButton
                  variant={'outline'}
                  className={cn(
                    'flex w-full items-center justify-between px-3 text-start font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(parseISO(field.value), 'PPP', { locale: dateLocale })
                  ) : (
                    <span>{t('placeholder')}</span>
                  )}
                  <CalendarIcon className="ms-2 h-4 w-4 opacity-50" />
                </ShadButton>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? parseISO(field.value) : undefined}
                onSelect={(date) =>
                  field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                }
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
                locale={dateLocale}
                classNames={{
                  day_selected: 'text-white bg-primary',
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
