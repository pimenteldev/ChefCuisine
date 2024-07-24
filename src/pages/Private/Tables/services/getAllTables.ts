import { baseUrl } from "@/constants/utilitys"
import { TablesApi } from "@/models/tables"
import { TablesViewAdapter } from "../adapters/tablesView"

const getAllTables = async (): Promise<TablesApi> => {
  return await fetch(`${baseUrl}tables.php`, {
    method: "GET",
  })
    .then((response): Promise<TablesApi> => response.json())
    .then((response) => TablesViewAdapter(response))
}

export default getAllTables
