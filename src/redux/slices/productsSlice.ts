import { ProductsApi } from "@/models/products"
import { createSlice } from "@reduxjs/toolkit"

export const productsKey = "products"

const ProductsApiEmptyState: ProductsApi = {
  products: [],
  categories: [],
  items: [],
  items_categories: [],
  units: [],
}

export const productsSlice = createSlice({
  name: productsKey,
  initialState: ProductsApiEmptyState,
  reducers: {
    setDataInProducts: (state, action) => action.payload,
  },
})

export const { setDataInProducts } = productsSlice.actions

export default productsSlice.reducer
