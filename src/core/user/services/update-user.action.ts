'use server';

import { cookies as nextCookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

export async function updateUser(
  args: Partial<{
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }>,
) {
  const cookies = await nextCookies();
  const accessToken = cookies.get('accessToken');

  try {
    const res = await secureFetch(`${process.env.SERVER_URL}/user/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(args),
    });

    return await res.json();
  } catch (e) {
    console.error('Error signing up', e);
  }
}
