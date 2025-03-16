import type { ReactNode } from 'react';
import { create } from 'zustand';

type DialogStore = {
  isOpen: boolean;
  children: { title: ReactNode | null; content: ReactNode | null } | null;
  open: () => void;
  close: () => void;
  registerContent: (
    args: {
      title: ReactNode | null;
      content: ReactNode | null;
    } | null,
  ) => void;
};

export const useDialogStore = create<DialogStore>(set => ({
  isOpen: false,
  children: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, children: null }),
  registerContent: children => set({ children }),
}));
