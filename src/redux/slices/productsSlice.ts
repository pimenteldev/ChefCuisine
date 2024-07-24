import { ProductsApi } from "@/models/products"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
    setDataInProducts: (state, action: PayloadAction<ProductsApi>) =>
      action.payload,
  },
})

export const { setDataInProducts } = productsSlice.actions

export default productsSlice.reducer
