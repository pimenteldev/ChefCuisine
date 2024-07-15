import { baseUrl } from "@/constants"
import { TablesApi } from "@/models"

const getAllTables = async (): Promise<TablesApi> => {
  const response = await fetch(`${baseUrl}tables.php`, {
    method: "GET",
  })

  return response.json()
}

export default getAllTables
