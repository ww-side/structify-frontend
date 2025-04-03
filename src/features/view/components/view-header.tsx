'use client';

import { useCallback } from 'react';

import { CreateColumnForm } from '@/features/columns/components/create-column-form';
import { createNewRow } from '@/features/rows/services';
import { useGetView } from '@/features/view/hooks';

import { notifyDanger, notifySuccess } from '@/shared/lib/toast';
import { Eye, useIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { Title } from '@/shared/ui/kit/title';

export function ViewHeader({ viewId }: { viewId: string }) {
  const { open, registerContent, close } = useDialogStore();
  const { data, loading, error } = useGetView(viewId);

  if (error) {
    console.error(error);
  }

  const Icon = useIcon(data?.view.icon ?? 'Eye');

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
    <header className="flex items-center justify-between mb-5">
      {loading ? (
        <Skeleton width={170} height={30} />
      ) : (
        <section className="flex items-center gap-3">
          <Title level={4}>{data?.view?.name}</Title>
          {Icon ? <Icon size={18} /> : <Eye size={18} />}
        </section>
      )}
      <section className="flex items-center gap-3">
        <Button onPress={openDialogHandler}>Create Column</Button>
        <Button onPress={createRowHandler}>Create new row</Button>
      </section>
    </header>
  );
}
