'use client';

import { useRouter } from 'next/navigation';

import { ScanEye, useIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/kit/text';

export function ViewInfo({
  id,
  icon,
  name,
}: {
  id: string;
  name: string;
  icon: string;
}) {
  const router = useRouter();

  const Icon = useIcon(icon);

  return (
    <li
      key={id}
      className="cursor-pointer flex items-center gap-3"
      onClick={() => router.push(`/view/${id}`)}
    >
      {Icon ? (
        <Icon size={14} color="white" />
      ) : (
        <ScanEye size="14" color="white" />
      )}
      <Text color="inverted">{name}</Text>
    </li>
  );
}
