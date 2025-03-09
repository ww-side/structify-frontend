'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/core/user/services';

import { User } from '@/shared/ui/kit/user';

import { getUserHandler, userDataMapping } from '../utils/user-data';

export function UserInfo() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    getUserHandler(setUser).catch(console.error);
  }, [setUser]);

  const { firstName, username, initials } = userDataMapping(user);

  return (
    <User
      name={firstName ?? username}
      avatarProps={{ name: initials, size: 'sm' }}
    />
  );
}
