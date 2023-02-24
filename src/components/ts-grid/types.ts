export interface ColumnDef {
  key: string;
  label: string;

}

export interface BasicRowModel {
  id: string | number;
  [field: string]: any;
}

export interface STGridProps<T extends BasicRowModel> {
  data: T[];
  columnDefs: ColumnDef[];
  multiSelect?: boolean;
}

export type SortBy = 'asc' | 'desc'
export type SortByColumn = null | {
    field: string,
    sortBy: SortBy
}