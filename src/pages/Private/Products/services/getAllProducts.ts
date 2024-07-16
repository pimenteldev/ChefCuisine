import { baseUrl } from "@/constants"
import { ProductsApi } from "@/models"
import { ProductsViewAdapter } from "../adapters"

const getAllProducts = async (): Promise<ProductsApi> => {
  return await fetch(`${baseUrl}products.php`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => ProductsViewAdapter(response))
}

export default getAllProducts
