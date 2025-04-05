import type { Metadata } from 'next';

import { columnsMapping } from '@/features/columns/lib';
import { rowsMapping } from '@/features/rows/lib';
import { CollectionView, ViewBreadcrumbs } from '@/features/view/components';
import { getData } from '@/features/view/services';

export const metadata: Metadata = {
  title: 'View | Structify',
  description: 'Noncommercial project management tool',
};

export default async function View({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { slug } = await params;
  const { pageSize: paramsPageSize, page: paramsPage } = await searchParams;

  const page = Number(paramsPage ?? 1);
  const pageSize = Number(paramsPageSize ?? 2);

  const res = await getData({ id: slug, page, pageSize });

  const totalPages = Math.ceil(res.data.count / pageSize);
  const columns = columnsMapping(res.data.columns);
  const rows = rowsMapping({
    rowValues: res.data.rowValues,
    rows: res.data.rows,
    columns: res.data.columns,
  });

  return (
    <main className="flex flex-col gap-3">
      <ViewBreadcrumbs id={slug} />
      <CollectionView
        viewId={slug}
        columns={columns}
        rows={rows}
        rowValues={res.data.rowValues}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </main>
  );
}
