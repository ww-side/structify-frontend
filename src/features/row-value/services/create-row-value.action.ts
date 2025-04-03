'use server';

import { cookies } from 'next/headers';

export async function createRowValue(args: {
  value: string;
  columnId: string;
  rowId: string;
  viewId: string;
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await fetch(`${process.env.SERVER_URL}/row-value/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });

  return await res.json();
}
