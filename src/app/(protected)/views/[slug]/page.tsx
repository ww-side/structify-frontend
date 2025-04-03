import type { Metadata } from 'next';

import { columnsMapping } from '@/features/columns/lib';
import { rowsMapping } from '@/features/rows/lib';
import { CollectionView } from '@/features/view/components';
import { getData } from '@/features/view/services';

export const metadata: Metadata = {
  title: 'View | Structify',
  description: 'Noncommercial project management tool',
};

export default async function View({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getData({ id: slug });

  const columns = columnsMapping(res.data.columns);
  const rows = rowsMapping({
    rowValues: res.data.rowValues,
    rows: res.data.rows,
    columns: res.data.columns,
  });

  return (
    <main>
      <CollectionView
        viewId={slug}
        columns={columns}
        rows={rows}
        rowValues={res.data.rowValues}
      />
    </main>
  );
}
