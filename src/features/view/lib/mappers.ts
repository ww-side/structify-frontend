import type { Column } from '@/features/columns/lib';

export const editedFormDataMapping = ({
  formValue,
  columns,
  viewId,
  rowId,
}: {
  formValue: Record<string, string>;
  columns: Column[];
  viewId: string;
  rowId: string;
}) => {
  return Object.entries(formValue)
    .map(([key, value]) => {
      const column = columns.find(col => col.key === key);
      return column ? { columnId: column.id, value, viewId, rowId } : null;
    })
    .filter(
      (
        item,
      ): item is {
        columnId: string;
        value: string;
        viewId: string;
        rowId: string;
      } => item !== null,
    );
};
