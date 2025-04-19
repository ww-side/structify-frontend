'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SidebarMenu = dynamic(() =>
  import('./sidebar-menu').then(m => m.SidebarMenu),
);

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
