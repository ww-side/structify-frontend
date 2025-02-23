'use client';

import { useEffect, useState } from 'react';
import { User } from '@heroui/user';

import { UserEntity } from '@/core/user/lib/user.entity';
import { getMe } from '@/core/user/services/get-me.action';

export function UserInfo() {
  const [user, setUser] = useState<UserEntity | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userRes = await getMe();
      if (userRes?.statusCode === 200) {
        setUser(userRes.data);
      }
    }
    fetchUser();
  }, []);

  const firstName = user?.firstName;
  const username = user?.username;
  const avatarName = firstName
    ? firstName.charAt(0).toUpperCase()
    : username?.charAt(0).toUpperCase();

  console.log(user);

  return (
    <User
      name={firstName ?? username}
      avatarProps={{ name: avatarName, size: 'sm' }}
    />
  );
}
