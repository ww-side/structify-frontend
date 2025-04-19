'use client';

import dynamic from 'next/dynamic';

import { Title } from '@/shared/ui/kit/title';

const ViewsList = dynamic(() =>
  import('@/features/view/components').then(mod => mod.ViewsList),
);

export function Views() {
  return (
    <section className="flex flex-col gap-5">
      <Title level={2}>Your Personal Views</Title>
      <ViewsList />
    </section>
  );
}
