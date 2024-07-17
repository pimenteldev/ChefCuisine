import { baseUrl } from "@/constants/utilitys"

async function AddTableService(formData: string) {
  const response = await fetch(`${baseUrl}tables.php`, {
    method: "POST",
    body: formData,
  })
  const json = await response.json()
  return json
}
export default AddTableService
