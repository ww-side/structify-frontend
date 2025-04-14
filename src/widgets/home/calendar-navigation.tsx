'use client';

import Link from 'next/link';

import { WidgetLayout } from '@/shared/ui/components/widget-layout';
import { CalendarCheck2 } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button';
import { Text } from '@/shared/ui/kit/text';

export function CalendarNavigation() {
  return (
    <WidgetLayout className="flex flex-col gap-2">
      <Text color="gray">Plan your tasks and events</Text>
      <Link href="/calendar">
        <Button
          size="sm"
          variant="solid"
          color="primary"
          className="flex items-center gap-2"
          fullWidth
        >
          <CalendarCheck2 size="14" />
          Open Calendar
        </Button>
      </Link>
    </WidgetLayout>
  );
}
