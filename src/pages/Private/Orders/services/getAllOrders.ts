import { baseUrl } from "@/constants/utilitys"
import { OrdersApi } from "@/models/orders"

const getAllOrders = async (): Promise<OrdersApi> => {
  return await fetch(`${baseUrl}orders.php`, {
    method: "GET",
  }).then((response): Promise<OrdersApi> => response.json())
}

export default getAllOrders
