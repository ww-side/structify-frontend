'use client';

import { availableViewIcons } from '@/features/view/lib';

import { Select, SelectItem } from '@/shared/ui/kit/select';
import { Text } from '@/shared/ui/kit/text';

export function ViewIconsSelect({
  value,
  onChange,
  errorMessage,
  isInvalid,
}: {
  value: string;
  onChange: (newValue: string) => void;
  errorMessage?: (string | undefined)[];
  isInvalid: boolean;
}) {
  return (
    <Select
      className="w-full"
      label="Icon"
      size="sm"
      placeholder="Select icon"
      selectionMode="single"
      value={value}
      onChange={e => onChange(e.target.value)}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isVirtualized
    >
      {availableViewIcons.map(Icon => (
        <SelectItem key={Icon.displayName} textValue={Icon.displayName}>
          <div className="flex items-center gap-3">
            <Icon className="h-4 w-4" />
            <Text color="gray">{Icon.displayName}</Text>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}
