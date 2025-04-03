import type { RowValueBuildDef } from './types';

export const updatedDataBuilder = ({ data, rowValues }: RowValueBuildDef) => {
  return data
    .map(item => {
      const rowValue = rowValues.find(
        rv =>
          rv.rowId === item.rowId &&
          rv.viewId === item.viewId &&
          rv.columnId === item.columnId,
      );
      return rowValue ? { id: rowValue.id, value: item.value } : null;
    })
    .filter((item): item is { id: string; value: string } => item !== null);
};

export const createdDataBuilder = ({ data, rowValues }: RowValueBuildDef) => {
  return data.filter(
    item =>
      !rowValues.some(
        rv =>
          rv.rowId === item?.rowId &&
          rv.viewId === item?.viewId &&
          rv.columnId === item?.columnId,
      ),
  );
};
