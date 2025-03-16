'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';

import { useDialogStore } from './dialog.store';

export function Dialog() {
  const { isOpen, close, children } = useDialogStore();

  return (
    <Modal isOpen={isOpen} onOpenChange={close}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {children?.title}
        </ModalHeader>
        <ModalBody>{children?.content}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
