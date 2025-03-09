'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';

import { ViewInfo } from '@/features/sidebar/components/view-info';

import { HeartCrack, type IconName, Settings } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import { GET_VIEWS } from '../services/views.query';
import { UserInfo } from './user-info';

export function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { data, loading, error } = useQuery<{
    views: { name: string; id: string; icon: IconName }[];
  }>(GET_VIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }

  return pathname !== '/auth' ? (
    <div className="flex gap-4 p-4">
      <section className="w-[250px] h-[96vh] sticky flex flex-col gap-3">
        <section className="p-3 bg-primary-dark rounded-2xl text-white">
          <UserInfo />
        </section>
        <section className="p-3 bg-primary-dark rounded-2xl text-white">
          <Title level={5}>Views</Title>
          <ul className="mt-5">
            {data?.views.map(item => <ViewInfo key={item.id} {...item} />)}
          </ul>
        </section>
        <button className="p-3 bg-primary-dark rounded-2xl flex items-center gap-3">
          <Settings size="14" color="white" />
          <Text color="white" weight="semibold">
            Settings
          </Text>
        </button>
        <button className="p-3 bg-primary-dark rounded-2xl flex items-center gap-3">
          <HeartCrack size={14} color="white" />
          <Text color="white" weight="semibold">
            Log Out
          </Text>
        </button>
      </section>
      <main className="bg-secondary w-full rounded-2xl p-2 border-1">
        {children}
      </main>
    </div>
  ) : (
    children
  );
}
