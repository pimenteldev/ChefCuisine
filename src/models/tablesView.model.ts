export interface TablesViewApi {
  tables: Table[]
}

export interface Table {
  table_id: number
  table_name: string
  table_status: number
  table_active?: number
}

export const TableEmptyState: Table = {
  table_id: 0,
  table_name: "",
  table_status: 0,
  table_active: 0,
}
