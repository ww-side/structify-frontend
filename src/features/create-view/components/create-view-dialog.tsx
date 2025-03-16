'use client';

import { useCallback } from 'react';

import { Hammer } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';

import { CreateViewForm } from './create-view-form';

export function CreateViewDialog() {
  const { open, registerContent, close } = useDialogStore();

  const openDialogHandler = useCallback(() => {
    registerContent({
      title: 'Create new View',
      content: <CreateViewForm onAfterSubmit={close} />,
    });
    open();
  }, [registerContent, open, close]);

  return (
    <Button
      size="sm"
      variant="solid"
      color="primary"
      onClick={openDialogHandler}
      className="flex items-center gap-2"
    >
      <Hammer size="14" />
      Start
    </Button>
  );
}
