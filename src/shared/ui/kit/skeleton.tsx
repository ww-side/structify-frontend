import React from 'react';

export function Skeleton({
  height = 27.8,
  width = 200,
}: {
  height?: number;
  width?: number | 'full';
}) {
  return (
    <div className="animate-pulse">
      <div
        className="bg-gray-200 rounded-xl"
        style={{
          width: typeof width === 'number' ? `${width}px` : '100%',
          height: `${height}px`,
        }}
      />
    </div>
  );
}
