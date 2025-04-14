'use client';

import {
  Drawer as Root,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/drawer';

import { useDrawerStore } from './drawer.store';

export function Drawer() {
  const { isOpen, close, children } = useDrawerStore();

  return (
    <Root isOpen={isOpen} size="2xl" onClose={close}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          {children?.title}
        </DrawerHeader>
        <DrawerBody>{children?.content}</DrawerBody>
        <DrawerFooter>{children?.footer}</DrawerFooter>
      </DrawerContent>
    </Root>
  );
}
