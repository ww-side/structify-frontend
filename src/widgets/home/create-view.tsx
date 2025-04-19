'use client';

import dynamic from 'next/dynamic';

import { WidgetLayout } from '@/shared/ui/components/widget-layout';
import { Text } from '@/shared/ui/kit/text';

const CreateViewDialog = dynamic(() =>
  import('@/features/create-view/components').then(m => m.CreateViewDialog),
);

export function CreateView() {
  return (
    <WidgetLayout className="flex flex-col gap-2">
      <Text color="gray">Build a new collection of your tasks</Text>
      <CreateViewDialog />
    </WidgetLayout>
  );
}
