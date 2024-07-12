import { baseUrl } from "@/constants"
import { ProductsViewApi } from "@/models"

export const getAllProducts = async (): Promise<ProductsViewApi> => {
  const response = await fetch(`${baseUrl}products.php`, {
    method: "GET",
  })

  return response.json()
}
