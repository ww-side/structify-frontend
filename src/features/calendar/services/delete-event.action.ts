'use server';

import { cookies } from 'next/headers';

import type { CalendarEventDef } from '../lib';

export async function deleteEvent(id: string) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await fetch(`${process.env.SERVER_URL}/calendar/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result: { statusCode: number; data: CalendarEventDef } =
    await res.json();

  return result;
}
