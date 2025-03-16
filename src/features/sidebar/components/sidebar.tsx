'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import { logout, useUserStore } from '@/core/user/services';

import { ViewInfo } from '@/features/sidebar/components/view-info';

import { HeartCrack, type IconName, Settings } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import { GET_VIEWS } from '../services/views.query';
import { UserInfo } from './user-info';

export function Sidebar({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { clearUser } = useUserStore();

  const { data, loading, error } = useQuery<{
    views: { name: string; id: string; icon: IconName }[];
  }>(GET_VIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
  }

  const logoutHandler = async () => {
    await logout();
    clearUser();
    router.push('/auth');
  };

  return (
    <div className="flex gap-4 p-4">
      <section className="w-[250px] h-[96vh] sticky flex flex-col gap-3">
        <section className="p-3 bg-secondary rounded-2xl text-primary-text border">
          <UserInfo />
        </section>
        <section className="p-3 bg-secondary rounded-2xl text-primary-text border">
          <Title level={5}>Views</Title>
          <ul className="mt-5 flex flex-col gap-1.5">
            {data?.views.map(item => <ViewInfo key={item.id} {...item} />)}
          </ul>
        </section>
        <button className="p-3 bg-secondary rounded-2xl flex items-center gap-3 border">
          <Settings size="14" />
          <Text weight="semibold">Settings</Text>
        </button>
        <button
          className="p-3 bg-secondary rounded-2xl flex items-center gap-3 border"
          onClick={logoutHandler}
        >
          <HeartCrack size={14} />
          <Text weight="semibold">Log Out</Text>
        </button>
      </section>
      <main className="bg-secondary w-full rounded-2xl p-2 border">
        {children}
      </main>
    </div>
  );
}
