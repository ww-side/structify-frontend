import { type UserEntity } from '@/core/user/lib';
import { getMe } from '@/core/user/services';

export async function getUserHandler(setUser: (user: UserEntity) => void) {
  const userRes = await getMe();
  if (userRes?.statusCode === 200) {
    setUser(userRes.data);
  }
}

export function userDataMapping(user: UserEntity | null) {
  const firstName = user?.firstName;
  const username = user?.username;
  return {
    firstName,
    username,
    initials: firstName
      ? firstName.charAt(0).toUpperCase()
      : username?.charAt(0).toUpperCase(),
  };
}
