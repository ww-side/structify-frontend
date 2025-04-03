'use client';

const dataTypes = [
  { key: 'text', label: 'Text' },
  { key: 'number', label: 'Number' },
  { key: 'select', label: 'Select' },
];

import { Select, SelectItem } from '@/shared/ui/kit/select';

export function ColumnDataTypeSelect({
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
      label="Data Types"
      size="sm"
      placeholder="Select Data Type"
      selectionMode="single"
      value={value}
      onChange={e => onChange(e.target.value)}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
    >
      {dataTypes.map(({ key, label }) => (
        <SelectItem key={key}>{label}</SelectItem>
      ))}
    </Select>
  );
}
