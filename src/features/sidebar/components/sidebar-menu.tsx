'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import { ThemeSwitcher } from '@/core/theme/components';
import { logout, useUserStore } from '@/core/user/services';

import { ViewInfo } from '@/features/sidebar/components/view-info';
import { GET_VIEWS } from '@/features/view/services';

import type { IconName } from '@/shared/ui/icons';
import { CalendarDays, HeartCrack, Settings } from '@/shared/ui/icons';
import { Skeleton } from '@/shared/ui/kit/skeleton';
import { Text } from '@/shared/ui/kit/text';
import { Title } from '@/shared/ui/kit/title';

import { UserInfo } from '../../../core/user/components/user-info';

const skeletons = Array.from({ length: 5 }, (_, i) => (
  <Skeleton key={i} width={150} height={20} />
));

export function SidebarMenu() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const { data, loading, error } = useQuery<{
    views: { name: string; id: string; icon: IconName }[];
  }>(GET_VIEWS);

  if (error) {
    console.error(error);
  }

  const logoutHandler = async () => {
    await logout();
    clearUser();
    router.push('/auth');
  };

  return (
    <section className="w-[250px] h-[96.4vh] sticky flex flex-col gap-3">
      <section className="p-3 flex items-center justify-between bg-secondary rounded-2xl text-primary-text border border-stroke-color">
        <UserInfo />
        <ThemeSwitcher />
      </section>
      <section className="p-3 bg-secondary rounded-2xl text-primary-text border border-stroke-color">
        <Link href="/views">
          <Title level={5}>Views</Title>
        </Link>
        <ul className="mt-5 flex flex-col gap-1.5">
          {loading
            ? skeletons
            : data?.views.map(item => <ViewInfo key={item.id} {...item} />)}
        </ul>
      </section>
      <Link
        href="/calendar"
        className="p-3 bg-secondary rounded-2xl flex items-center gap-3 border border-stroke-color"
      >
        <CalendarDays size="14" />
        <Text weight="semibold">Calendar</Text>
      </Link>
      <Link
        href="/settings"
        className="p-3 bg-secondary rounded-2xl flex items-center gap-3 border border-stroke-color"
      >
        <Settings size="14" />
        <Text weight="semibold">Settings</Text>
      </Link>
      <button
        className="p-3 bg-secondary rounded-2xl flex items-center gap-3 border border-stroke-color"
        onClick={logoutHandler}
      >
        <HeartCrack size={14} />
        <Text weight="semibold">Log Out</Text>
      </button>
    </section>
  );
}
