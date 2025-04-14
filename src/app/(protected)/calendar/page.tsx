import { CalendarView } from '@/features/calendar/components';
import { getEvents } from '@/features/calendar/services';

export default async function Calendar() {
  const res = await getEvents();

  const events = res.data.events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <main>
      <CalendarView events={events} />
    </main>
  );
}
