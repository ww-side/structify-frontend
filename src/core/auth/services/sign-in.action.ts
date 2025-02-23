'use server';

import { cookies } from 'next/headers';

export async function signIn(args: { username: string; password: string }) {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/auth/sign-in`, {
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
    });

    const setCookie = res.headers.get('set-cookie');
    const result: {
      statusCode: number;
      message: string;
      data: { accessToken: string };
    } = await res.json();

    if (setCookie) {
      const refreshToken = setCookie.match(/refreshToken=([^;]+)/)?.[1];
      const accessToken = result.data.accessToken;

      if (refreshToken) {
        const cookie = await cookies();
        cookie.set('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });

        cookie.set('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
      }
    }

    return result;
  } catch (e) {
    console.error('Error signing up', e);
  }
}
