'use client';

import { ViewHeaderActions } from './view-header-actions';
import { ViewTitle } from './view-title';

export function ViewHeader({ viewId }: { viewId: string }) {
  return (
    <header className="flex items-center justify-between mb-5">
      <ViewTitle viewId={viewId} />
      <ViewHeaderActions viewId={viewId} />
    </header>
  );
}
