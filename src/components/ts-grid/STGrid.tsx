import { useCallback, useMemo, useState } from "react";
import { BasicRowModel, SortBy, SortByColumn, STGridProps } from "./types";
import styles from "./STGrid.module.scss";

const STGrid = <T extends BasicRowModel>(props: STGridProps<T>) => {
  const { data, columnDefs, multiSelect = false } = props;
  const [sortColumn, setSortColumn] = useState<SortByColumn>(null);

  const handleSort = useCallback((columnKey: string) => {
    setSortColumn((currentSortCol) => {
      let sortBy: SortBy = "asc";
      if (currentSortCol?.field === columnKey && currentSortCol.sortBy === "asc") {
        sortBy = "desc";
      }
      return {
        field: columnKey,
        sortBy,
      };
    });
  }, []);

  const sortedData: T[] = useMemo(() => {
    return !!sortColumn
      ? data.sort((a, b) => {
          const valueA = a[sortColumn.field];
          const valueB = b[sortColumn.field];
          if (valueA === valueB) {
            return 0;
          }
          const direction = sortColumn.sortBy === "asc" ? -1 : 1;
          return valueA < valueB ? direction : -direction;
        })
      : data;
  }, [data, sortColumn]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th />
          {columnDefs.map((colDef) => (
            <th key={colDef.key}>
              <div onClick={() => handleSort(colDef.key)} className={styles.header}>
                {colDef.label}{" "}
                <div className={styles.headerButton}>
                  {!!sortColumn &&
                    sortColumn.field === colDef.key &&
                    (sortColumn.sortBy === "asc" ? <span>&#42780;</span> : <span>&#42779;</span>)}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((rowData) => (
          <tr key={rowData.id}>
            <td>
              <input
                type="checkbox"
                onChange={(event) => {
                  // setSelectedRows(event.target.checked ? sortedData : []);
                }}
              />
            </td>
            {columnDefs.map((colDef) => (
              <td key={colDef.key}>{rowData[colDef.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default STGrid;
