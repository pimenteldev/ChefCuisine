import { OrdersEmptyState } from "@/models/orders"
import { createSlice } from "@reduxjs/toolkit"

export const tablesKey = "orders"

export const orderSlice = createSlice({
  name: "orders",
  initialState: OrdersEmptyState,
  reducers: {
    setInitialData: (state, action) => action.payload,
  },
})

export const { setInitialData } = orderSlice.actions

export default orderSlice.reducer
