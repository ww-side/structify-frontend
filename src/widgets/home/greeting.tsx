'use client';

import { useUserStore } from '@/core/user/services';

import { Handshake } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';

export function Greeting() {
  const { user } = useUserStore();

  return (
    <section className="flex items-center justify-center w-max rounded-xl gap-3 border p-4">
      <Handshake />
      <Text color="gray">Hello, {user?.firstName ?? user?.username}</Text>
    </section>
  );
}
