import type { RowValue } from '@/features/row-value/lib';

import type { IconName } from '@/shared/ui/icons';

export type RowValueBuildDef = {
  data: {
    columnId: string;
    value: string;
    viewId: string;
    rowId: string;
  }[];
  rowValues: RowValue[];
};

export type View = {
  id: string;
  name: string;
  icon: IconName;
  formats: string[];
};
