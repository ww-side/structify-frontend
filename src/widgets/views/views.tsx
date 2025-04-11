'use client';

import { ViewsList } from '@/features/view/components';

import { Title } from '@/shared/ui/kit/title';

export function Views() {
  return (
    <section className="flex flex-col gap-5">
      <Title level={2}>Your Personal Views</Title>
      <ViewsList />
    </section>
  );
}
