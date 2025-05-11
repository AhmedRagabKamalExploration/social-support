'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@dge/ui-core';
import { Globe } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

import { useDirection } from '@/hooks/use-direction';
import { LANGUAGES, type Locale } from '@/i18n/locale';
import { Link, usePathname } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const { locale } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const direction = useDirection();

  // Preserve query parameters when switching languages
  const getHrefWithParams = (path: string) => {
    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  };

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="me-2 h-4 w-4" />
          {String(locale).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(LANGUAGES).map(([key, label]) => (
          <Link
            href={getHrefWithParams(pathname)}
            key={key}
            locale={key as Locale}
          >
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              checked={locale === key}
            >
              {label}
            </DropdownMenuCheckboxItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
