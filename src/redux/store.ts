import {ProductsViewApi, User} from '@/models'
import {configureStore} from '@reduxjs/toolkit'
import {productsViewReducer, userReducer} from './slices'

export interface AppStore {
  user: User
  productsViewState: ProductsViewApi
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    productsViewState: productsViewReducer,
  },
})
