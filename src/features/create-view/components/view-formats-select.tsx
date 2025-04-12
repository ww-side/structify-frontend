'use client';

import type { ChangeEvent } from 'react';

import { viewFormats } from '@/features/view/lib';

import { Select, SelectItem } from '@/shared/ui/kit/select';

export function ViewFormatsSelect({
  value,
  onChange,
  errorMessage,
  isInvalid,
}: {
  value: string[];
  onChange: (newValue: string[]) => void;
  errorMessage?: (string | undefined)[];
  isInvalid: boolean;
}) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = e.target.value.split(',');
    onChange(selectedValues);
  };

  return (
    <Select
      className="w-full"
      label="Formats"
      size="sm"
      placeholder="Select formats"
      selectionMode="multiple"
      selectedKeys={value}
      value={value}
      onChange={handleSelectChange}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
    >
      {viewFormats.map(({ key, label }) => (
        <SelectItem key={key}>{label}</SelectItem>
      ))}
    </Select>
  );
}
