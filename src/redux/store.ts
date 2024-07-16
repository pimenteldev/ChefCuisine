import { OrdersApi, ProductsApi, TablesApi, User } from "@/models"
import { configureStore } from "@reduxjs/toolkit"
import { productsSlice, tablesSlice, userSlice, ordersSlice } from "./slices"

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
