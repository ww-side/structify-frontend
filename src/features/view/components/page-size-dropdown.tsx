'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/kit/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/shared/ui/kit/dropdown';
import { Text } from '@/shared/ui/kit/text';

export function PageSizeDropdown({
  page,
  currentPageSize,
}: {
  page: number;
  currentPageSize: number;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Text>Page Size:</Text>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="flat">{currentPageSize}</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={[
            { label: '5', key: 5 },
            { label: '10', key: 10 },
            { label: '20', key: 20 },
          ]}
        >
          {item => (
            <DropdownItem
              className="capitalize"
              key={item.key}
              onPress={() => router.push(`?page=${page}&pageSize=${item.key}`)}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
