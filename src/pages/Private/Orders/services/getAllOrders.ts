import { baseUrl } from "@/constants"
import { OrdersApi } from "@/models"

const getAllOrders = async (): Promise<OrdersApi> => {
  return await fetch(`${baseUrl}orders.php`, {
    method: "GET",
  }).then((response): Promise<OrdersApi> => response.json())
}

export default getAllOrders
