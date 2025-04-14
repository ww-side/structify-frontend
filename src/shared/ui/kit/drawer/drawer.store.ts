import type { ReactNode } from 'react';
import { create } from 'zustand';

type DrawerStore = {
  isOpen: boolean;
  children: { title: ReactNode | null; content: ReactNode | null, footer: ReactNode | null } | null;
  open: () => void;
  close: () => void;
  registerContent: (
    args: {
      title: ReactNode | null;
      content: ReactNode | null;
      footer: ReactNode | null;
    } | null,
  ) => void;
};

export const useDrawerStore = create<DrawerStore>(set => ({
  isOpen: false,
  children: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, children: null }),
  registerContent: children => set({ children }),
}));
