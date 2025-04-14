'use server';

import { cookies } from 'next/headers';

import type { CalendarEventDef } from '../lib';

export async function updateEvent(
  args: Partial<Omit<CalendarEventDef, 'id'>> & { id: string },
): Promise<{ statusCode: number; data: CalendarEventDef }> {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await fetch(`${process.env.SERVER_URL}/calendar/${args.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });
  const result = await res.json();

  return {
    statusCode: result.statusCode,
    data: {
      ...result.data,
      start: new Date(result.data.start),
      end: new Date(result.data.end),
    },
  };
}
