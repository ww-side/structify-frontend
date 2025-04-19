'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

import type { CalendarEventDef } from '../lib';

export async function getEvents() {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/calendar/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result: { statusCode: number; data: { events: CalendarEventDef[] } } =
    await res.json();
  return result;
}
