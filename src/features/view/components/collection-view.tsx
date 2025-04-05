'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination } from '@heroui/pagination';

import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';
import { initializeRows, useRowsStore } from '@/features/rows/services';
import { useViewFormatStore } from '@/features/view/services';

import { PageSizeDropdown } from './page-size-dropdown';
import { TableView } from './table-view';
import { ViewHeader } from './view-header';

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
  useEffect(() => initializeRows(rows), [rows]);

  const router = useRouter();

  const { data } = useRowsStore();
  const { activeView } = useViewFormatStore();

  return (
    <section>
      <ViewHeader viewId={viewId} />
      <TableView
        columns={columns}
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
