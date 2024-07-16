import { TablesApi } from "@/models/tables"

export const TablesViewAdapter = (tablesApi: TablesApi) => {
  return {
    tables: tablesApi.tables,
  }
}
