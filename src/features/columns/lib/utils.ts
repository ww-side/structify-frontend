import type { Column, OriginColumn } from './types';

export const columnsMapping = (columns: OriginColumn[]): Column[] => {
  return columns.map(column => ({
    id: column.id,
    key: column.name.toLowerCase(),
    name: column.name,
    dataType: column.dataType,
    variants: column.variants ?? [],
  }));
};
