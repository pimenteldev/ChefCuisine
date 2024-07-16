import { baseUrl } from "@/constants"
import { TablesApi } from "@/models"
import { TablesViewAdapter } from "../adapters"

const getAllTables = async (): Promise<TablesApi> => {
  return await fetch(`${baseUrl}tables.php`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => TablesViewAdapter(response))
}

export default getAllTables
