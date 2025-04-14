'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/core/user/services';

import {
  getUserHandler,
  userDataMapping,
} from '@/features/sidebar/utils/user-data';

import { User } from '@/shared/ui/kit/user';

export function UserInfo() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    getUserHandler(setUser).catch(console.error);
  }, [setUser]);

  const { fullName, username, initials } = userDataMapping(user);

  return (
    <User
      name={fullName ?? username}
      avatarProps={{ name: initials, size: 'sm', color: 'primary' }}
    />
  );
}
