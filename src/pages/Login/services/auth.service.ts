import { baseUrl } from "@/constants"
import { BackendUser } from "@/models"
import { UserAdapter } from "../adapters"

export const authService = async (data: Partial<BackendUser>) => {
  return await fetch(`${baseUrl}log.php`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => UserAdapter(response))
}
