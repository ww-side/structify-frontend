'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function WidgetLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'border w-max rounded-xl border-stroke-color p-4',
        className,
      )}
    >
      {children}
    </section>
  );
}
