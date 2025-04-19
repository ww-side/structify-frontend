'use client';

import Image from 'next/image';

import { Title } from '@/shared/ui/kit/title';

export function Logo() {
  return (
    <section className="flex items-center gap-3 w-max">
      <Image src="/logo.svg" alt="logo" width={38} height={45} />
      <Title level={2}>structify</Title>
    </section>
  );
}
