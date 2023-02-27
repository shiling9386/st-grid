import { useCallback, useMemo, useState } from "react";
import { BasicRowModel, SortBy, SortByColumn, STGridProps } from "./types";
import styles from "./STGrid.module.scss";
import CheckBox from "../elements/CheckBox";
import RadioButton from "../elements/RadioButton";

const STGrid = <T extends BasicRowModel>(props: STGridProps<T>) => {
  const { data, columnDefs, selectionMode } = props;
  const [sortColumn, setSortColumn] = useState<SortByColumn>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = useCallback((columnKey: string) => {
    setSortColumn((currentSortCol) => {
      let sortBy: SortBy = "asc";
      if (currentSortCol?.field === columnKey) {
        if (currentSortCol.sortBy === "asc") {
          sortBy = "desc";
        } else {
          return null;
        }
      }
      return {
        field: columnKey,
        sortBy,
      };
    });
  }, []);

  const handleRowSelection = useCallback(
    (rowData: T, isMultiSelect: boolean) => {
      if (isMultiSelect) {
        if (selectedRows.find((x) => x.id === rowData.id)) {
          setSelectedRows((x) => x.filter((data) => data.id !== rowData.id));
        } else {
          setSelectedRows((x) => [...x, rowData]);
        }
      } else {
        if (selectedRows[0]?.id === rowData.id) {
          setSelectedRows([]);
        } else {
          setSelectedRows([rowData]);
        }
      }
    },
    [selectedRows]
  );

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
          {!!selectionMode && <th>Selected: {selectedRows.length}</th>}
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
        {sortedData.map((rowData) => {
          const selected = !!selectedRows.find((s) => s.id === rowData.id);
          return (
            <tr key={rowData.id} className={selected ? styles.selectedRow : undefined}>
              {!!selectionMode && (
                <td>
                  {selectionMode === "multi" ? (
                    <CheckBox
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, true)}
                    />
                  ) : (
                    <RadioButton
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, false)}
                    />
                  )}
                </td>
              )}
              {columnDefs.map((colDef) => (
                <td key={colDef.key}>{rowData[colDef.key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default STGrid;
