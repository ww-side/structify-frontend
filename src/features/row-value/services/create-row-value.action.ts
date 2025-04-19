'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

export async function createRowValue(args: {
  value: string;
  columnId: string;
  rowId: string;
  viewId: string;
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/row-value/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });

  return await res.json();
}
