'use client';

import { Skeleton } from '@/shared/ui/kit/skeleton';

export function CalendarEventLoading() {
  return (
    <section className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} width="full" height={20} />
      ))}
    </section>
  );
}
