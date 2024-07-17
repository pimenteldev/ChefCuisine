import { OrdersEmptyState } from "@/models/orders"
import { createSlice } from "@reduxjs/toolkit"

export const ordersKey = "orders"

export const ordersSlice = createSlice({
  name: ordersKey,
  initialState: OrdersEmptyState,
  reducers: {
    setInitialData: (state, action) => action.payload,
  },
})

export const { setInitialData } = ordersSlice.actions

export default ordersSlice.reducer
