'use server';

import { cookies } from 'next/headers';

import { secureFetch } from '@/shared/lib/network';

type CreateColumnReponse = {
  statusCode: number;
  data: {
    name: string;
    dataType: string;
    viewId: string;
    userId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function createColumn(args: {
  viewId: string;
  dataType: string;
  name: string;
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(`${process.env.SERVER_URL}/column/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(args),
  });
  const result: CreateColumnReponse = await res.json();

  return result;
}
