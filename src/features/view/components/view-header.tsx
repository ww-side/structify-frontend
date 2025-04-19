'use client';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/shared/ui/kit/skeleton';

import { ViewTitle } from './view-title';

const ViewHeaderActions = dynamic(
  () => import('./view-header-actions').then(m => m.ViewHeaderActions),
  {
    ssr: false,
    loading: () => <Skeleton width={240} height={23} />,
  },
);

export function ViewHeader({ viewId }: { viewId: string }) {
  return (
    <header className="flex items-center justify-between mb-5">
      <ViewTitle viewId={viewId} />
      <ViewHeaderActions viewId={viewId} />
    </header>
  );
}
