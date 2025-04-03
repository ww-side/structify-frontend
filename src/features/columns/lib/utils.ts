import type { Column } from './types';

export const columnsMapping = (columns: Record<string, string>[]): Column[] => {
  return columns.map(column => ({
    id: column.id,
    key: column.name.toLowerCase(),
    name: column.name,
    dataType: column.dataType,
  }));
};
