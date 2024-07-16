import { TablesApi } from "@/models"

export const TablesViewAdapter = (tablesApi: TablesApi) => {
  return {
    tables: tablesApi.tables,
  }
}
