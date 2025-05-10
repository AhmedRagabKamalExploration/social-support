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

import { getCountryStateCitiesAction } from '@/actions/country-state-cities.action';
import { ErrorFallback } from '@/components/error-fallback/error-fallback';
import type { City } from '@/types/city.type';

import type { PersonalInformationFormData } from '../../schema';

export function CountryStateCities() {
  const { control, setValue, watch } =
    useFormContext<PersonalInformationFormData>();
  const [cities, setCities] = useState<City[]>([]);
  // TODO: handle loading state
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.City',
  );

  const countryIso2 = watch('country');
  const stateCode = watch('stateOrEmirate');

  const fetchCountryStates = async (countryIso2: string, stateCode: string) => {
    try {
      setIsLoading(true);
      const cities = await getCountryStateCitiesAction(countryIso2, stateCode);
      setCities(cities);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (countryIso2 && stateCode) {
      fetchCountryStates(countryIso2, stateCode);
    }
  }, [countryIso2, stateCode]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FormField
        control={control}
        name="city"
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
                      ? cities.find((city) => city.name === field.value)?.name
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
                    <CommandEmpty>{t('noCityFound')}</CommandEmpty>
                    <CommandGroup>
                      {cities.map(({ name }) => (
                        <CommandItem
                          value={name}
                          key={name}
                          onSelect={() => {
                            setValue('city', name);
                          }}
                        >
                          {name}
                          <Check
                            className={cn(
                              'ml-auto',
                              name === field.value
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
    </ErrorBoundary>
  );
}
