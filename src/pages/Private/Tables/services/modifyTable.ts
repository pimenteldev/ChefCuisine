import { baseUrl } from "@/constants/utilitys"

async function ModifyTableService(formData: string) {
  const response = await fetch(`${baseUrl}tables.php`, {
    method: "PUT",
    body: formData,
  })
  const json = await response.json()
  return json
}
export default ModifyTableService
