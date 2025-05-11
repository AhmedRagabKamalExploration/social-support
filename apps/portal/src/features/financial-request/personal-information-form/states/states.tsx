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
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useFormContext } from 'react-hook-form';

import { getCountryStatesAction } from '@/actions/country-states.action';
import { ErrorFallback } from '@/components/error-fallback/error-fallback';
import { SelectSkeleton } from '@/components/select-skeleton/select-skeleton';
import { State } from '@/types/state.type';

import type { PersonalInformationFormData } from '../../schema';

export function CountryStates() {
  const { control, setValue, watch } =
    useFormContext<PersonalInformationFormData>();
  const [states, setStates] = useState<State[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.State',
  );

  const countryIso2 = watch('country');

  const fetchCountryStates = async (countryIso2: string) => {
    try {
      setIsLoading(true);
      const states = await getCountryStatesAction(countryIso2);
      setStates(states);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (countryIso2) {
      fetchCountryStates(countryIso2);
    } else {
      // Clear states when country is not selected
      setStates([]);
    }
  }, [countryIso2]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FormField
        control={control}
        name="stateOrEmirate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{t('label')}</FormLabel>
            {isLoading ? (
              <SelectSkeleton />
            ) : (
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
                        ? states.find(
                            (state) => state.state_code === field.value,
                          )?.name
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
                      <CommandEmpty>{t('noStateFound')}</CommandEmpty>
                      <CommandGroup>
                        {states.map(({ state_code, name }) => (
                          <CommandItem
                            value={name}
                            key={name}
                            onSelect={() => {
                              setValue('stateOrEmirate', state_code);
                              // Reset city when state changes
                              setValue('city', '');
                            }}
                          >
                            {name}
                            <Check
                              className={cn(
                                'ml-auto',
                                state_code === field.value
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
            )}

            <FormMessage />
          </FormItem>
        )}
      />
    </ErrorBoundary>
  );
}
