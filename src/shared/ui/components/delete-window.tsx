'use client';

import { Button } from '@/shared/ui/kit/button';
import { useDialogStore } from '@/shared/ui/kit/dialog';
import { Text } from '@/shared/ui/kit/text';

export function DeleteWindow({ onDelete }: { onDelete: () => void }) {
  const { close } = useDialogStore();

  return (
    <section className="flex flex-col gap-7">
      <Text>
        This action is permanent and cannot be undone. Once deleted, the record
        cannot be recovered.
      </Text>
      <div className="flex items-center justify-center gap-5">
        <Button color="default" onPress={close}>
          Cancel
        </Button>
        <Button color="danger" onPress={onDelete}>
          Yes, delete
        </Button>
      </div>
    </section>
  );
}
