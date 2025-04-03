import React from 'react';

export function Skeleton({
  height = 27.8,
  width = 200,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <div className="animate-pulse">
      <div
        className="bg-gray-200 rounded-sm"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}
