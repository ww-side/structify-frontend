'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/kit/button';

const routes = [
  { name: 'Home', link: '/' },
  { name: 'Views', link: '/views' },
  { name: 'Calendar', link: '/calendar' },
  { name: 'Settings', link: '/settings' },
];

export function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex flex-col gap-3">
      {routes.map(({ name, link }) => (
        <Button
          key={link}
          variant="faded"
          fullWidth
          onClick={() => router.push(link)}
        >
          {name}
        </Button>
      ))}
    </nav>
  );
}
