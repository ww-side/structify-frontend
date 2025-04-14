import { create } from 'zustand';

import type { CalendarEventDef } from '../lib';

type CalendarStore = {
  events: CalendarEventDef[];
  setData: (data: CalendarEventDef[]) => void;
  create: (data: CalendarEventDef) => void;
  remove: (id: string) => void;
  update: (id: string, value: Partial<CalendarEventDef>) => void;
};

export const useCalendarStore = create<CalendarStore>(set => ({
  events: [],
  setData: newData => set(() => ({ events: newData })),
  create: (newData: CalendarEventDef) =>
    set(state => ({
      events: [...state.events, newData],
    })),
  update: (id, value) =>
    set(state => ({
      events: state.events.map(item =>
        item.id === id ? { ...item, ...value } : item,
      ),
    })),
  remove: id =>
    set(state => ({ events: state.events.filter(item => item.id !== id) })),
}));

export const initEvents = (defaultData: CalendarEventDef[]) => {
  useCalendarStore.setState({ events: defaultData });
};
