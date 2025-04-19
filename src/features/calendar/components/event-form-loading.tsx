'use client';

import { Skeleton } from '@/shared/ui/kit/skeleton';

export function EventFormLoading() {
  return (
    <section className="flex flex-col gap-3">
      <Skeleton width="full" height={56} />
      <Skeleton width="full" height={100} />
      <Skeleton width="full" height={56} />
      <Skeleton width="full" height={56} />
      <Skeleton width="full" height={56} />
      <Skeleton width="full" height={100} />
    </section>
  );
}
