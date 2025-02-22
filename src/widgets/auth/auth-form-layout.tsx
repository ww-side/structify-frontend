'use client';

import { ReactNode } from 'react';

export function AuthFormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-1/2 h-full flex items-center justify-center">
      {children}
    </div>
  );
}
