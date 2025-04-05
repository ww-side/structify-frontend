'use client';

import Link from 'next/link';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';

export function ViewBreadcrumbs({ id }: { id: string }) {
  return (
    <Breadcrumbs radius="lg" variant="solid">
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="/views">Views</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>#{id}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
