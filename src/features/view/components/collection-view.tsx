'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import type { Column } from '@/features/columns/lib';
import {
  initColumns,
  useColumnStore,
} from '@/features/columns/services/columns.store';
import type { RowValue } from '@/features/row-value/lib';
import { initializeRows, useRowsStore } from '@/features/rows/services';
import { useViewFormatStore } from '@/features/view/services';

import { Skeleton } from '@/shared/ui/kit/skeleton';

import { PageSizeDropdown } from './page-size-dropdown';
import { TableView } from './table-view';
import { ViewHeader } from './view-header';

const Pagination = dynamic(
  () => import('@/shared/ui/kit/pagination').then(mod => mod.Pagination),
  {
    ssr: false,
    loading: () => <Skeleton width={160} height={32} />,
  },
);

export function CollectionView({
  viewId,
  rows,
  columns,
  rowValues,
  page,
  pageSize,
  totalPages,
}: {
  viewId: string;
  columns: Column[];
  rows: Record<string, string>[];
  rowValues: RowValue[];
  page: number;
  pageSize: number;
  totalPages: number;
}) {
  useEffect(() => {
    initializeRows(rows);
    initColumns(columns);
  }, [rows, columns]);

  const router = useRouter();

  const { data } = useRowsStore();
  const { columns: cols } = useColumnStore();
  const { activeView } = useViewFormatStore();

  return (
    <section>
      <ViewHeader viewId={viewId} />
      <TableView
        columns={cols}
        rows={data}
        viewId={viewId}
        rowValues={rowValues}
        makeList={activeView === 'list'}
      />
      <section className="flex items-center justify-between mt-6">
        <Pagination
          total={totalPages}
          page={page}
          onChange={nextPage => {
            router.push(`?page=${nextPage}&pageSize=${pageSize}`);
          }}
        />
        <PageSizeDropdown page={page} currentPageSize={pageSize} />
      </section>
    </section>
  );
}
