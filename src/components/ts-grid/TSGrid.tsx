import React, { useState } from "react";

interface Column {
  key: string;
  label: string;
  type?: "checkbox" | "radio";
  render?: (cellValue: any, rowData: any) => JSX.Element;
}

interface Props {
  data: any[];
  columns: Column[];
  onRowClick?: (rowData: any) => void;
  multiSelect?: boolean;
}

function TSGrid({ data, columns, onRowClick, multiSelect = false }: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };

  const handleRowClick = (rowData: any) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowData: any
  ) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, rowData]);
    } else {
      setSelectedRows(selectedRows.filter((r) => r !== rowData));
    }
  };

  const sortedData = sortColumn
    ? data.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA === valueB) {
          return 0;
        }
        if (sortOrder === "asc") {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      })
    : data;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              <button onClick={() => handleSort(column.key)}>
                {column.label}{" "}
                {sortColumn === column.key && (sortOrder === "asc" ? "▲" : "▼")}
              </button>
            </th>
          ))}
          {multiSelect && (
            <th>
              <input
                type="checkbox"
                onChange={(event) => {
                  setSelectedRows(event.target.checked ? sortedData : []);
                }}
              />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((rowData) => (
          <tr key={rowData.id} onClick={() => handleRowClick(rowData)}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render
                  ? column.render(rowData[column.key], rowData)
                  : rowData[column.key]}
              </td>
            ))}
            {multiSelect && (
              <td>
                <input
                  type={"checkbox"}
                  checked={selectedRows.includes(rowData)}
                  onChange={(event) => handleSelect(event, rowData)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TSGrid;
