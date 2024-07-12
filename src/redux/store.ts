import { ProductsViewApi, TablesViewApi, User } from "@/models"
import { configureStore } from "@reduxjs/toolkit"
import { productsViewReducer, tablesViewReducer, userReducer } from "./slices"

export interface AppStore {
  user: User
  productsViewState: ProductsViewApi
  tablesViewState: TablesViewApi
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    productsViewState: productsViewReducer,
    tablesViewState: tablesViewReducer,
  },
})
