import { configureStore } from "@reduxjs/toolkit"
import { OrdersApi } from "@/models/orders"
import { ProductsApi } from "@/models/products"
import { TablesApi } from "@/models/tables"
import { User } from "@/models/user"
import ordersSlice from "./slices/ordersSlice"
import productsSlice from "./slices/productsSlice"
import tablesSlice from "./slices/tablesSlice"
import userSlice from "./slices/userSlice"

export interface AppStore {
  user: User
  products: ProductsApi
  tables: TablesApi
  orders: OrdersApi
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice,
    products: productsSlice,
    tables: tablesSlice,
    orders: ordersSlice,
  },
})
