'use client';

import { useCallback, useEffect, useMemo } from 'react';
import type { DateLocalizer } from 'react-big-calendar';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { cn } from '@/shared/lib/utils';
import { useDrawerStore } from '@/shared/ui/kit/drawer';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CalendarEventDef } from '../lib';
import { deleteEvent, initEvents, useCalendarStore } from '../services';
import { CalendarEvent, CalendarEventFooter } from './calendar-event';
import { EventForm } from './event-form';

const localizer = dayjsLocalizer(dayjs);

export function CalendarView({ events }: { events: CalendarEventDef[] }) {
  useEffect(() => initEvents(events), [events]);

  const { registerContent, open, close } = useDrawerStore();
  const { events: values, remove } = useCalendarStore();

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      registerContent({
        title: 'Create Event',
        content: <EventForm event={{ start, end }} onAfterSubmit={close} />,
        footer: null,
      });
      open();
    },
    [registerContent, open, close],
  );

  const handleEditEvent = useCallback(
    (event: CalendarEventDef) => {
      registerContent({
        title: 'Edit Event',
        content: <EventForm event={event} onAfterSubmit={close} />,
        footer: null,
      });
    },
    [registerContent, close],
  );

  const handleDeleteEvent = useCallback(
    async (id: string) => {
      const res = await deleteEvent(id);

      if (res.statusCode === 200) {
        notifySuccess('Event deleted successfully');
        remove(id);
      } else {
        notifyDanger('Failed to delete event');
      }

      close();
    },
    [close, remove],
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEventDef) => {
      registerContent({
        title: 'Event Details',
        content: <CalendarEvent {...event} />,
        footer: (
          <CalendarEventFooter
            onEdit={() => handleEditEvent(event)}
            onDelete={() => handleDeleteEvent(event.id)}
          />
        ),
      });
      open();
    },
    [registerContent, open, handleEditEvent, handleDeleteEvent],
  );

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined,
        ) =>
          localizer
            ? localizer.format(date, 'ddd', culture)
            : date.toLocaleDateString(),
        dayFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined,
        ) =>
          localizer
            ? localizer.format(date, 'ddd M/D', culture)
            : date.toLocaleDateString(),
        timeGutterFormat: (
          date: Date,
          culture: string | undefined,
          localizer: DateLocalizer | undefined,
        ) =>
          localizer
            ? localizer.format(date, 'hh A', culture)
            : date.toLocaleTimeString(),
      },
    }),
    [],
  );

  return (
    <div className="h-[90vh]">
      <Calendar
        localizer={localizer}
        events={values}
        views={views}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        className={cn(
          '[&_.rbc-btn-group>button:first-child]:rounded-l-md [&_.rbc-btn-group>button:last-child]:rounded-r-md',
          '[&_.rbc-month-view]:rounded-l [&_.rbc-selected]:border-gray-200 [&_.rbc-selected]:border [&_.rbc-selected]:!bg-primary [&_.rbc-month-view_.rbc-today]:opacity-20 [&_.rbc-month-view_.rbc-today]:bg-primary [&_.rbc-time-view]:rounded-lg [&_.rbc-event]:bg-primary [&_.rbc-btn-group]:rounded-xl [&_.rbc-btn-group>button]:transition [&_.rbc-btn-group>button]:duration-300 [&_.rbc-btn-group>button]:ease-in-out [&_.rbc-btn-group>button]:bg-transparent [&_.rbc-btn-group>button:hover]:bg-primary [&_.rbc-btn-group>button:hover]:text-white [&_.rbc-active]:!bg-primary [&_.rbc-active]:text-white [&_.rbc-active:focus]:text-white [&_.rbc-btn-group>button]:text-gray-0',
          '[&_.rbc-time-column]:bg-transparent [&_.rbc-time-view_.rbc-header.rbc-today]:bg-primary [&_.rbc-time-view_.rbc-header.rbc-today]:text-white [&_.rbc-current-time-indicator]:bg-primary',
          '[&_.rbc-time-view_.rbc-row-content]:bg-secondary',
        )}
      />
    </div>
  );
}
