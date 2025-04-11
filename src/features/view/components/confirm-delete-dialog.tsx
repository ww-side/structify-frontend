'use client';

import { useCallback } from 'react';

import { deleteRow, useRowsStore } from '@/features/rows/services';

import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { DeleteWindow } from '@/shared/ui/components/delete-window';
import { useDialogStore } from '@/shared/ui/kit/dialog';

export function ConfirmDeleteDialog({ rowId }: { rowId: string }) {
  const remove = useRowsStore(state => state.remove);
  const { close } = useDialogStore();

  const onDelete = useCallback(
    async (id: string) => {
      const { statusCode } = await deleteRow(id);

      if (statusCode === 200) {
        remove(id);
        notifySuccess('Row deleted successfully');
      } else {
        notifyDanger('Failed to delete row');
      }

      close();
    },
    [remove, close],
  );

  return <DeleteWindow onDelete={() => onDelete(rowId)} />;
}
