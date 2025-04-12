'use server';

import { cookies } from 'next/headers';

export async function updateColumn({
  id,
  name,
  variants,
}: {
  id: string;
  name?: string;
  variants?: string[];
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await fetch(`${process.env.SERVER_URL}/column/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, variants }),
  });

  return await res.json();
}
