import { baseUrl } from "@/constants/utilitys"
import { BackendUser } from "@/models/user"
import { UserAdapter } from "../adapters/user"

export const authService = async (data: Partial<BackendUser>) => {
  return await fetch(`${baseUrl}log.php`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => UserAdapter(response))
}
