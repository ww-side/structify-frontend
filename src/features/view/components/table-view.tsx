'use client';

import { useCallback, useMemo } from 'react';

import { ColumnEditDialog } from '@/features/columns/components';
import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';

import { Edit } from '@/shared/ui/icons';
import { useDialogStore } from '@/shared/ui/kit/dialog';
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
  const { open, registerContent } = useDialogStore();

  const extendedColumns = useMemo(
    () => [
      ...columns,
      { id: 'actions', key: 'actions', name: '', dataType: 'text' },
    ],
    [columns],
  );

  const handleEditColumn = useCallback(
    (column: Column) => {
      registerContent({
        title: 'Edit Column',
        content: <ColumnEditDialog value={column} />,
      });
      open();
    },
    [registerContent, open],
  );

  return (
    <Table isStriped={makeList} hideHeader={makeList}>
      <TableHeader columns={extendedColumns}>
        {column => (
          <TableColumn key={column.key}>
            <div className="flex items-center gap-2">
              {column.name}
              {column.key !== 'actions' && (
                <button onClick={() => handleEditColumn(column)}>
                  <Edit size={14} />
                </button>
              )}
            </div>
          </TableColumn>
        )}
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
