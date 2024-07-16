import { baseUrl } from "@/constants/utilitys"
import { ProductsApi } from "@/models/products"
import { ProductsViewAdapter } from "../adapters/productsView"

const getAllProducts = async (): Promise<ProductsApi> => {
  return await fetch(`${baseUrl}products.php`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => ProductsViewAdapter(response))
}

export default getAllProducts
