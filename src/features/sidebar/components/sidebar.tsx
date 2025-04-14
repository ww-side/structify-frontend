'use client';

import { type ReactNode } from 'react';

import { SidebarMenu } from './sidebar-menu';

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 p-4">
      <SidebarMenu />
      <main className="bg-secondary w-full rounded-2xl py-4 px-8 border border-stroke-color">
        {children}
      </main>
    </div>
  );
}
