'use server';

import { cookies as nextCookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

import { type UserEntity } from '../lib';

export async function getMe() {
  const cookies = await nextCookies();
  const accessToken = cookies.get('accessToken');

  try {
    const res = await secureFetch(`${process.env.SERVER_URL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    const result: { statusCode: number; message: string; data: UserEntity } =
      await res.json();
    return result;
  } catch (e) {
    console.error('Error signing up', e);
  }
}
