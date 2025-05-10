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
import { useFormContext } from 'react-hook-form';

import type { Country } from '@/types/country.type';

import type { PersonalInformationFormData } from '../../schema';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

export function Countries({ countries }: { countries: Country[] }) {
  const { control, setValue } = useFormContext<PersonalInformationFormData>();
  return (
    <FormField
      control={control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Country</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <ShadButton
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? countries.find((country) => country.name === field.value)
                        ?.name
                    : 'Select country'}
                  <ChevronsUpDown className="opacity-50" />
                </ShadButton>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        value={country.name}
                        key={country.name}
                        onSelect={() => {
                          setValue('country', country.name);
                        }}
                      >
                        {country.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            country.name === field.value
                              ? 'opacity-100'
                              : 'opacity-0',
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
