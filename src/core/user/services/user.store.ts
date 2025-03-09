import { create } from 'zustand';

import { UserEntity } from '@/core/user/lib';

type UserState = {
  user: UserEntity | null;
  setUser: (user: UserEntity) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}));
