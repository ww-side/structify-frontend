'use client';

import { CreateViewDialog } from '@/features/create-view/components';

import { WidgetLayout } from '@/shared/ui/components/widget-layout';
import { Text } from '@/shared/ui/kit/text';

export function CreateView() {
  return (
    <WidgetLayout className="flex flex-col gap-2">
      <Text color="gray">Build a new collection of your tasks</Text>
      <CreateViewDialog />
    </WidgetLayout>
  );
}
