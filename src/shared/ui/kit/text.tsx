'use client';

import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const textVariants = cva('text-sm font-normal', {
  variants: {
    color: {
      gray: 'text-gray-500',
      white: 'text-white',
      default: 'text-primary-text',
      inverted: 'text-inverted-text',
    },
    weight: {
      semibold: 'font-semibold',
      medium: 'font-medium',
      normal: 'font-normal',
    },
  },
});

type TextVariants = VariantProps<typeof textVariants>;

export function Text({
  children,
  color = 'default',
  weight = 'normal',
}: {
  children: ReactNode;
} & TextVariants) {
  return (
    <p className={cn('text-sm font-normal', textVariants({ color, weight }))}>
      {children}
    </p>
  );
}
