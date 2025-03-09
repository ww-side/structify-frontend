import { cookies } from 'next/headers';

import { refreshToken } from '@/core/auth/services';

export async function secureFetch(url: string, options: RequestInit = {}) {
  const cookiesStore = await cookies();
  let accessToken = cookiesStore.get('accessToken')?.value;

  const makeRequest = async (token?: string) => {
    const headers = new Headers(options.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      const res = await refreshToken();
      accessToken = res?.accessToken;
      if (accessToken) {
        return makeRequest(accessToken);
      }
    }
    return response;
  };

  return makeRequest(accessToken);
}
