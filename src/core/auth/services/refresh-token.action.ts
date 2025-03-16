'use server';

import { cookies } from 'next/headers';

export async function refreshToken() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get('refreshToken');

  if (!refreshToken) {
    console.log('Refresh token is missing');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken.value}`,
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });

    const result = await response.json();

    if (result.data.accessToken) {
      cookiesStore.set('accessToken', result.data.accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      return { accessToken: result.data.accessToken };
    } else {
      cookiesStore.delete('accessToken');
      cookiesStore.delete('refreshToken');

      return { accessToken: null };
    }
  } catch (err) {
    console.error('Error refreshing token', err);
  }
}
