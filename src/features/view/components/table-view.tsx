'use client';

import { useMemo } from 'react';

import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';

import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@/shared/ui/kit/table';

import { ViewActions } from './view-actions';

export function TableView({
  columns,
  rows,
  viewId,
  rowValues,
  makeList = false,
}: {
  columns: Column[];
  rows: Record<string, string>[];
  viewId: string;
  rowValues: RowValue[];
  makeList?: boolean;
}) {
  const extendedColumns = useMemo(
    () => [...columns, { key: 'actions', name: '' }],
    [columns],
  );

  return (
    <Table isStriped={makeList} hideHeader={makeList}>
      <TableHeader columns={extendedColumns}>
        {column => <TableColumn key={column.key}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <TableRow key={item.key}>
            {columnKey =>
              columnKey === 'actions' ? (
                <TableCell className="flex items-center justify-end gap-3">
                  <ViewActions
                    rowId={item.key}
                    item={item}
                    columns={columns}
                    viewId={viewId}
                    rowValues={rowValues}
                  />
                </TableCell>
              ) : (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
