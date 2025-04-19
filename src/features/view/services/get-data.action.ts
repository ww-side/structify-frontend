'use server';

import { cookies } from 'next/headers';

import type { OriginColumn } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';

import { secureFetch } from '@/shared/lib/network';

type GetDataResponse = {
  statusCode: number;
  data: {
    columns: OriginColumn[];
    rows: Record<string, string>[];
    rowValues: RowValue[];
    count: number;
    next?: string;
    prev?: string;
  };
  error?: string;
  message?: string;
};

export async function getData({
  id,
  page = 1,
  pageSize = 10,
}: {
  id: string;
  page?: number;
  pageSize?: number;
}) {
  const cookiesImp = await cookies();
  const token = cookiesImp.get('accessToken')?.value;

  const res = await secureFetch(
    `${process.env.SERVER_URL}/view-data/?viewId=${id}&page=${page}&page_size=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    },
  );

  const result: GetDataResponse = await res.json();
  return result;
}
