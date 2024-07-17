import { ProductInOrder } from "@/models/products"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const orderKey = "order"
const initialState = {
  products: [],
  isTableSelected: false,
  tableSelectId: 0,
  tableSelectName: "",
  isPersonalSelected: false,
  personalSelectDocument: "",
  personalSelectName: "",
}

export const orderSlice = createSlice({
  name: orderKey,
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<ProductInOrder>) => {
      const productInOrder = state.products.find(
        (product) => product.product_id === action.payload.product_id
      )
      if (productInOrder) {
        if (productInOrder.product_count !== undefined) {
          productInOrder.product_count++
        }
      } else {
        state.products.push({ ...action.payload, product_count: 1 })
      }
    },
    incrementQuantity: (state, action) => {
      const currentProduct = state.products.find(
        (product) => product.product_id === action.payload
      )
      currentProduct.product_count++
    },
    decrementQuantity: (state, action) => {
      const currentProduct = state.products.find(
        (product) => product.product_id === action.payload
      )
      if (currentProduct.product_count === 1) {
        currentProduct.product_count = 1
      } else {
        currentProduct.product_count--
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.products.filter(
        (item) => item.id !== action.payload
      )
      state.products = removeItem
    },
    addTableSelect: (
      state,
      action: PayloadAction<{ table_id: number; table_name: string }>
    ) => {
      const { table_id, table_name } = action.payload
      state.isTableSelected = true
      state.tableSelectId = table_id
      state.tableSelectName = table_name
    },
    addPersonalSelect: (
      state,
      action: PayloadAction<{
        personal_document: string
        personal_name: string
      }>
    ) => {
      const { personal_document, personal_name } = action.payload

      state.isPersonalSelected = true
      state.personalSelectDocument = personal_document
      state.personalSelectName = personal_name
    },
  },
})

export const {
  addToOrder,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addTableSelect,
  addPersonalSelect,
} = orderSlice.actions

export default orderSlice.reducer
