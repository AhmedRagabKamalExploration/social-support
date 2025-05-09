'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@dge/ui-core';
import { Globe } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useDirection } from '@/hooks/use-direction';
import { LANGUAGES, type Locale } from '@/i18n/locale';
import { Link, usePathname } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const { locale } = useParams();
  const pathname = usePathname();
  const direction = useDirection();

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
          <Link href={pathname} key={key} locale={key as Locale}>
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
