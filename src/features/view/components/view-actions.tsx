'use client';

import { useCallback } from 'react';

import type { Column } from '@/features/columns/lib';
import type { RowValue } from '@/features/row-value/lib';

import { PackageX, Pencil } from '@/shared/ui/icons';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Tooltip } from '@/shared/ui/kit/tooltip';

import { ConfirmDeleteDialog } from './confirm-delete-dialog';
import { EditDialog } from './edit-dialog';

export function ViewActions({
  rowId,
  item,
  columns,
  viewId,
  rowValues,
}: {
  rowId: string;
  viewId: string;
  item: Record<string, string>;
  columns: Column[];
  rowValues: RowValue[];
}) {
  const { open, registerContent } = useDialogStore();

  const onOpenEdit = useCallback(() => {
    registerContent({
      title: `Edit ${rowId}`,
      content: (
        <EditDialog
          record={item}
          columns={columns}
          viewId={viewId}
          rowValues={rowValues}
        />
      ),
    });
    open();
  }, [columns, item, open, registerContent, rowId, viewId, rowValues]);

  const onOpenDelete = useCallback(() => {
    registerContent({
      title: `Are you sure to delete #${rowId}?`,
      content: <ConfirmDeleteDialog rowId={rowId} />,
    });
    open();
  }, [open, registerContent, rowId]);

  return (
    <div className="flex items-center gap-4">
      <Tooltip content="Edit" delay={1500}>
        <button
          onClick={onOpenEdit}
          className="border-gray-200 border rounded-lg p-1 transition duration-500 hover:border-primary"
        >
          <Pencil
            className="text-primary-text transition duration-500"
            size={18}
          />
        </button>
      </Tooltip>
      <Tooltip content="Delete" delay={1500}>
        <button
          onClick={onOpenDelete}
          className="border-gray-200 border rounded-lg p-1 transition duration-500 hover:border-primary"
        >
          <PackageX className="text-primary-text" size={18} />
        </button>
      </Tooltip>
    </div>
  );
}
