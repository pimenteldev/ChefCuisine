import { OrdersApi } from "@/models/orders"
import { TablesApi } from "@/models/tables"
import { User } from "@/models/user"
import { configureStore } from "@reduxjs/toolkit"
import orderSlice from "./slices/orderSlice"
import ordersSlice from "./slices/ordersSlice"
import productsSlice from "./slices/productsSlice"
import tablesSlice from "./slices/tablesSlice"
import userSlice from "./slices/userSlice"
import { ProductInOrder, ProductsApi } from "@/models/products"

export interface AppStore {
  user: User
  products: ProductsApi
  tables: TablesApi
  orders: OrdersApi
  currentOrder: CurrentOrder
}

export interface CurrentOrder {
  products: ProductInOrder[]
  isTableSelected: boolean
  tableSelectId: number
  tableSelectName: string
  isPersonalSelected: boolean
  personalSelectDocument: string
  personalSelectName: string
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice,
    products: productsSlice,
    tables: tablesSlice,
    orders: ordersSlice,
    currentOrder: orderSlice,
  },
})
