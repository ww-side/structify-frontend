import { create } from 'zustand';

type RowsStore = {
  data: Record<string, string>[];
  setData: (data: Record<string, string>[]) => void;
  remove: (id: string) => void;
  update: (id: string, value: Record<string, string>) => void;
};

export const useRowsStore = create<RowsStore>(set => ({
  data: [],
  setData: newData => set(state => ({ data: [...state.data, ...newData] })),
  update: (id, value) =>
    set(state => ({
      data: state.data.map(item =>
        item.key === id ? { ...item, ...value } : item,
      ),
    })),
  remove: id =>
    set(state => ({ data: state.data.filter(item => item.key !== id) })),
}));

export const initializeRows = (defaultData: Record<string, string>[]) => {
  useRowsStore.setState({ data: defaultData });
};
