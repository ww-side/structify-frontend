import { create } from 'zustand';

import type { Column } from '@/features/columns/lib';

type ColumnsStore = {
  columns: Column[];
  setData: (data: Column[]) => void;
  create: (data: Column) => void;
  remove: (id: string) => void;
  update: (id: string, value: Partial<Column>) => void;
};

export const useColumnStore = create<ColumnsStore>(set => ({
  columns: [],
  setData: newData => set(() => ({ columns: newData })),
  create: (newData: Column) =>
    set(state => ({
      columns: [...state.columns, newData],
    })),
  update: (id, value) =>
    set(state => ({
      columns: state.columns.map(item =>
        item.id === id ? { ...item, ...value } : item,
      ),
    })),
  remove: id =>
    set(state => ({ columns: state.columns.filter(item => item.id !== id) })),
}));

export const initColumns = (defaultData: Column[]) => {
  useColumnStore.setState({ columns: defaultData });
};
