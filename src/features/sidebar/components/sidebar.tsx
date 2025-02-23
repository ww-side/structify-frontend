'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui/kit/button';

import { Navigation } from './navigation';
import { UserInfo } from './user-info';

export function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return pathname !== '/auth' ? (
    <div className="flex gap-4 p-4">
      <section className="bg-primary-dark w-[250px] h-[96.8vh] sticky rounded-2xl p-3 text-white flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <Image src="/logo.svg" alt="logo" width={58} height={65} priority />
        </div>
        <Navigation />
        <div className="mt-auto flex items-center justify-between">
          <UserInfo />
          <Button color="danger" size="sm">
            Log Out
          </Button>
        </div>
      </section>
      {children}
    </div>
  ) : (
    children
  );
}
