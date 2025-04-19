'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

export async function deleteRow(id: string) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/row/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result: { statusCode: number } = await res.json();

  return result;
}
