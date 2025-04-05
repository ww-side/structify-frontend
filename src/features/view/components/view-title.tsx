'use client';

import { useGetView } from '@/features/view/hooks';

import { Eye, useIcon } from '@/shared/ui/icons';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { Title } from '@/shared/ui/kit/title';

import { ViewFormat } from './view-format';

export function ViewTitle({ viewId }: { viewId: string }) {
  const { data, loading, error } = useGetView(viewId);

  if (error) {
    console.error(error);
  }

  const Icon = useIcon(data?.view.icon ?? 'Eye');

  if (loading) {
    return <Skeleton width={170} height={30} />;
  }

  return (
    <section className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {Icon ? <Icon size={18} /> : <Eye size={18} />}
        <Title level={4}>{data?.view.name}</Title>
      </div>
      <ViewFormat formats={data?.view.formats} />
    </section>
  );
}
