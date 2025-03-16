'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/sidebar/components';

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return pathname === '/auth' ? children : <Sidebar>{children}</Sidebar>;
}
