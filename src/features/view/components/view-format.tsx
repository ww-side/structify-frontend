'use client';

import { useEffect, useMemo } from 'react';

import { initViewFormat, useViewFormatStore } from '@/features/view/services';

import { Chip } from '@/shared/ui/kit/chip';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/shared/ui/kit/dropdown';

export function ViewFormat({ formats }: { formats?: string[] }) {
  useEffect(() => initViewFormat(formats?.[0] ?? ''), [formats]);

  const { activeView, setActiveView } = useViewFormatStore();

  const variants = useMemo(
    () =>
      formats?.map(format => ({
        key: format,
        label: format,
      })),
    [formats],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Chip className="capitalize cursor-pointer" radius="lg" variant="flat">
          {activeView}
        </Chip>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={variants}>
        {item => (
          <DropdownItem
            className="capitalize"
            key={item.key}
            onPress={() => setActiveView(item.key)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
