import type { RowValue } from '@/features/row-value/lib';

export type RowValueBuildDef = {
  data: {
    columnId: string;
    value: string;
    viewId: string;
    rowId: string;
  }[];
  rowValues: RowValue[];
};
