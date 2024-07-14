import { baseUrl } from "@/constants"

async function RemoveTableService(table_id: number) {
  const response = await fetch(`${baseUrl}tables.php?table_id=${table_id}`, {
    method: "DELETE",
  })
  const json = await response.json()
  return json
}
export default RemoveTableService
