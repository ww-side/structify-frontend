'use client';

import { useRouter } from 'next/navigation';

import { type IconName, ScanEye, useIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';

export function ViewInfo({
  id,
  icon,
  name,
}: {
  id: string;
  name: string;
  icon: IconName;
}) {
  const router = useRouter();

  const Icon = useIcon(icon);

  return (
    <li
      key={id}
      className="cursor-pointer flex items-center gap-3"
      onClick={() => router.push(`/views/${id}`)}
    >
      {Icon ? <Icon size={14} /> : <ScanEye size="14" />}
      <Text>{name}</Text>
    </li>
  );
}
