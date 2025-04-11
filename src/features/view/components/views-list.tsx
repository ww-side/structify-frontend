'use client';

import { CreateViewDialog } from '@/features/create-view/components';
import { View } from '@/features/view/components/view';

import { Skeleton } from '@/shared/ui/kit/skeleton';
import { Text } from '@/shared/ui/kit/text';

import { useGetFullViews } from '../hooks';
import { ViewWidgetLayout } from './view-widget-layout';

const skeletons = Array.from({ length: 5 }, (_, i) => (
  <Skeleton key={i} width={208} height={110} />
));

export function ViewsList() {
  const { data, loading, error } = useGetFullViews();

  if (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-wrap gap-3">
      {loading
        ? skeletons
        : data?.views.map(view => <View key={view.id} {...view} />)}
      <ViewWidgetLayout className="flex flex-col gap-4">
        <Text color="gray">Create a new set of your tasks</Text>
        <CreateViewDialog />
      </ViewWidgetLayout>
    </section>
  );
}
