import {ItemProduct, Product, ProductsViewApi} from '@/models'
import {createSlice} from '@reduxjs/toolkit'

export const productsKey = 'products'

const ProductsViewApiEmptyState: ProductsViewApi = {
  products: [],
  categories: [],
  items: [],
  items_categories: [],
  units: [],
}

export const productsViewSlice = createSlice({
  name: 'productsViewState',
  initialState: ProductsViewApiEmptyState,
  reducers: {
    setDataInViewProducts: (state, action) => action.payload,
  },
})

export const {setDataInViewProducts} = productsViewSlice.actions

export default productsViewSlice.reducer
