'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

import type { CalendarEventDef } from '../lib';

export async function createEvent(args: {
  title: string;
  description: string;
  location: string;
  notes: string;
  start: Date;
  end: Date;
}): Promise<{ statusCode: number; data: CalendarEventDef }> {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/calendar/`, {
    method: 'POST',
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
