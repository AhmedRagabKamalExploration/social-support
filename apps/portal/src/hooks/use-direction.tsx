'use client';

import { useParams } from 'next/navigation';

export function useDirection() {
  const { locale } = useParams();

  return locale === 'ar' ? 'rtl' : 'ltr';
}

export type Direction = ReturnType<typeof useDirection>;
