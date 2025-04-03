'use client';

import { useEffect } from 'react';

import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';
import { initializeRows, useRowsStore } from '@/features/rows/services';

import { TableView } from './table-view';
import { ViewHeader } from './view-header';

export function CollectionView({
  viewId,
  rows,
  columns,
  rowValues,
}: {
  viewId: string;
  columns: Column[];
  rows: Record<string, string>[];
  rowValues: RowValue[];
}) {
  useEffect(() => initializeRows(rows), [rows]);

  const { data } = useRowsStore();

  return (
    <section>
      <ViewHeader viewId={viewId} />
      <TableView
        columns={columns}
        rows={data}
        viewId={viewId}
        rowValues={rowValues}
      />
    </section>
  );
}
