import { ProductsApi, TablesApi, User } from "@/models"
import { configureStore } from "@reduxjs/toolkit"
import { productsReducer, tablesReducer, userReducer } from "./slices"

export interface AppStore {
  user: User
  products: ProductsApi
  tables: TablesApi
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    products: productsReducer,
    tables: tablesReducer,
  },
})
