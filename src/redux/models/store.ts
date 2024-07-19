import { OrdersApi } from "@/models/orders"
import { ProductsApi } from "@/models/products"
import { TablesApi } from "@/models/tables"
import { User } from "@/models/user"

export interface AppStore {
  user: User
  products: ProductsApi
  tables: TablesApi
  orders: OrdersApi
}
