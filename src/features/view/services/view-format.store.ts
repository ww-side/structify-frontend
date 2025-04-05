import { create } from 'zustand';

type ViewFormatStore = {
  activeView: string;
  setActiveView: (name: string) => void;
};

export const useViewFormatStore = create<ViewFormatStore>(set => ({
  activeView: '',
  setActiveView: name => set(() => ({ activeView: name })),
}));

export const initViewFormat = (activeView: string) => {
  useViewFormatStore.setState({ activeView });
};
