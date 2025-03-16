'use server';

import { cookies } from 'next/headers';

export async function logout() {
  const cookiesImpl = await cookies();

  cookiesImpl.set('refreshToken', '', { maxAge: 0 });
  cookiesImpl.set('accessToken', '', { maxAge: 0 });
}
