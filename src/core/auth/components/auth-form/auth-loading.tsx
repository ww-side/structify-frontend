'use client';

import { Skeleton } from '@/shared/ui/kit/skeleton';

export function AuthLoading({ rows = 3 }: { rows?: number }) {
  return (
    <section className="flex flex-col gap-5">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} height={56} width="full" />
      ))}
    </section>
  );
}
