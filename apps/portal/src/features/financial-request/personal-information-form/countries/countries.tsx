'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { SelectSkeleton } from '@/components/select-skeleton/select-skeleton';
import type { Country } from '@/types/country.type';

import type { PersonalInformationFormData } from '../../schema';

export function Countries({
  countries,
  isLoading,
}: {
  countries: Country[];
  isLoading: boolean;
}) {
  const { control, setValue } = useFormContext<PersonalInformationFormData>();
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.Country',
  );

  if (isLoading) {
    return (
      <FormItem className="flex flex-col">
        <FormLabel>{t('label')}</FormLabel>
        <SelectSkeleton />
      </FormItem>
    );
  }

  return (
    <FormField
      control={control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t('label')}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <ShadButton
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'flex w-full items-center justify-between gap-2',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? countries.find((country) => country.iso2 === field.value)
                        ?.emoji
                    : ''}

                  {field.value
                    ? countries.find((country) => country.iso2 === field.value)
                        ?.name
                    : t('placeholder')}

                  <ChevronsUpDown className="opacity-50" />
                </ShadButton>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder={t('placeholderSearch')}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>{t('noCountryFound')}</CommandEmpty>
                  <CommandGroup>
                    {countries.map(({ iso2, name, emoji }) => (
                      <CommandItem
                        value={iso2}
                        key={name}
                        onSelect={() => {
                          setValue('country', iso2);
                          // Reset state and city when country changes
                          setValue('stateOrEmirate', '');
                          setValue('city', '');
                        }}
                      >
                        <span className="me-0.5">{emoji}</span>
                        {name}
                        <Check
                          className={cn(
                            'ml-auto',
                            iso2 === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
