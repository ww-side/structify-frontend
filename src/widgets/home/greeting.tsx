'use client';

import { useUserStore } from '@/core/user/services';

import { WidgetLayout } from '@/shared/ui/components/widget-layout';
import { Handshake } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';

export function Greeting() {
  const { user } = useUserStore();

  return (
    <WidgetLayout className="flex items-center justify-center gap-3">
      <Handshake />
      <Text color="gray">Hello, {user?.firstName ?? user?.username}</Text>
    </WidgetLayout>
  );
}
