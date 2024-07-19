import { configureStore } from "@reduxjs/toolkit"
import orderSlice from "./slices/orderSlice"
import productsSlice from "./slices/productsSlice"
import tablesSlice from "./slices/tablesSlice"
import userSlice from "./slices/userSlice"
import { AppStore } from "./models/store"

export default configureStore<AppStore>({
  reducer: {
    user: userSlice,
    products: productsSlice,
    tables: tablesSlice,
    orders: orderSlice,
  },
})
