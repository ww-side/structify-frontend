'use client';

import { JSX, ReactNode } from 'react';

const titleStyles: Record<number, string> = {
  1: 'text-[2.375rem] font-semibold',
  2: 'text-[1.875rem] font-semibold',
  3: 'text-[1.5rem] font-semibold',
  4: 'text-[1.25rem] font-semibold',
  5: 'text-[1rem] font-semibold',
};

export function Title({
  children,
  level = 1,
}: {
  children: ReactNode;
  level?: number;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = titleStyles[level];

  return <Tag className={className}>{children}</Tag>;
}
