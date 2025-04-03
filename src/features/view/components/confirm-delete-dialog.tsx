'use client';

import { useCallback } from 'react';

import { deleteRow, useRowsStore } from '@/features/rows/services';

import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Text } from '@/shared/ui/kit/text';

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

  return (
    <section className="flex flex-col gap-7">
      <Text>
        This action is permanent and cannot be undone. Once deleted, the record
        cannot be recovered.
      </Text>
      <div className="flex items-center justify-center gap-5">
        <Button color="default" onClick={close}>
          Cancel
        </Button>
        <Button color="danger" onClick={() => onDelete(rowId)}>
          Yes, delete
        </Button>
      </div>
    </section>
  );
}
