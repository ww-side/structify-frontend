'use server';

import { cookies } from 'next/headers';

export async function createNewRow(args: { viewId: string }) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await fetch(`${process.env.SERVER_URL}/row/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });

  const result: { statusCode: number; message?: string } = await res.json();

  return result;
}
