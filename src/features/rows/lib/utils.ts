export const rowsMapping = ({
  rows,
  rowValues,
  columns,
}: {
  rows: Record<string, string>[];
  rowValues: Record<string, string>[];
  columns: Record<string, string>[];
}) => {
  return rows.map(row => {
    const rowData: Record<string, string> = { key: row.id };

    rowValues
      .filter(value => value.rowId === row.id)
      .forEach(value => {
        const column = columns.find(col => col.id === value.columnId);
        if (column) {
          rowData[column.name.toLowerCase()] = value.value;
        }
      });

    return rowData;
  });
};
