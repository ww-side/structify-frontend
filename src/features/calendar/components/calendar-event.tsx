'use client';

import dayjs from 'dayjs';

import { CalendarClock, MapPin, NotebookPen } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import type { CalendarEventDef } from '../lib';

export function CalendarEvent({
  description,
  end,
  location,
  notes,
  start,
  title,
}: CalendarEventDef) {
  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col gap-2 mb-5">
        <Title level={4}>{title}</Title>
        {description && <Text>{description}</Text>}
      </section>
      <section className="flex items-center gap-3">
        <CalendarClock size={14} />
        <Text>Event Start:</Text>
        <Text weight="semibold">
          {dayjs(start).format('MMMM D, YYYY [at] h:mm A')}
        </Text>
      </section>
      <section className="flex items-center gap-3">
        <CalendarClock size={14} />
        <Text>Event End:</Text>
        <Text weight="semibold">
          {dayjs(end).format('MMMM D, YYYY [at] h:mm A')}
        </Text>
      </section>
      <section className="flex items-center gap-3">
        <MapPin size={14} />
        <Text>Location:</Text>
        <Text weight="semibold">{location}</Text>
      </section>
      <section className="flex items-center gap-3">
        <NotebookPen size={14} />
        <Text>Notes:</Text>
        <Text weight="semibold">{notes}</Text>
      </section>
    </section>
  );
}
