'use client';

import { useCallback } from 'react';

import { CreateColumnForm } from '@/features/columns/components';
import { createNewRow } from '@/features/rows/services';

import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Columns2, Rows2 } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';

export function ViewHeaderActions({ viewId }: { viewId: string }) {
  const { open, registerContent, close } = useDialogStore();

  const openDialogHandler = useCallback(() => {
    registerContent({
      title: 'Create new View',
      content: <CreateColumnForm onClose={close} viewId={viewId} />,
    });
    open();
  }, [registerContent, open, close, viewId]);

  const createRowHandler = useCallback(async () => {
    const { statusCode, message } = await createNewRow({ viewId });

    if (statusCode === 200) {
      notifySuccess('Row created');
    } else {
      notifyDanger(`Failed to create row. ${message}`);
    }
  }, [viewId]);

  return (
    <section className="flex items-center gap-3">
      <Button
        size="sm"
        variant="bordered"
        color="primary"
        onPress={createRowHandler}
      >
        <Rows2 size={14} />
        Create Row
      </Button>
      <Button size="sm" color="primary" onPress={openDialogHandler}>
        <Columns2 size={14} />
        Create Column
      </Button>
    </section>
  );
}
