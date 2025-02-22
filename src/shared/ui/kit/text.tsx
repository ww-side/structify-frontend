'use client';

import { ReactNode } from 'react';

export function Text({ children }: { children: ReactNode }) {
  return <p className="text-base font-normal">{children}</p>;
}
