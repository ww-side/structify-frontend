'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

export async function updateRowValue({
  id,
  value,
}: {
  value: string;
  id: string;
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/row-value/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ value }),
  });

  return await res.json();
}
