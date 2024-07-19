import { parserDecimals } from "@/helpers/math"
import { OrdersApi, OrdersEmptyState } from "@/models/orders"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const orderKey = "order"

const updateItemsCounts = () => {}

export const orderSlice = createSlice({
  name: orderKey,
  initialState: OrdersEmptyState,
  reducers: {
    setInitialDataOrder: (state, action: PayloadAction<OrdersApi>) => {
      const {
        categories,
        items,
        items_categories,
        orders,
        personal,
        products,
        role,
        settings,
        tables,
        units,
      } = action.payload

      const filteredOrders = []

      orders.forEach((order) =>
        order.order_list_inventary.forEach((item) => filteredOrders.push(item))
      )

      const list = state.currentOrder.products || []
      let newListItems = items || []

      filteredOrders.forEach((product) => {
        const countItemsInProduct = product.product_items.length
        const productCount = product.product_count || 1
        for (let i = 0; i < countItemsInProduct; i++) {
          newListItems = newListItems.map((li) => {
            if (li.item_id === product.product_items[i].item_id) {
              return {
                ...li,
                item_count:
                  li.item_count -
                  product.product_items[i].item_count * productCount,
              }
            }
            return li
          })
        }
      })

      list.forEach((product) => {
        const countItemsInProduct = product.product_items.length
        const productCount = product.product_count || 1

        for (let i = 0; i < countItemsInProduct; i++) {
          newListItems = newListItems.map((li) => {
            return li.item_id === product.product_items[i].item_id
              ? {
                  ...li,
                  item_count:
                    li.item_count -
                    product.product_items[i].item_count * productCount,
                }
              : li
          })
        }
      })

      return {
        ...state,
        categories,
        items: newListItems,
        items_categories,
        orders,
        personal,
        products,
        role,
        settings,
        tables,
        units,
      }
    },

    addToOrder: (state, action) => {
      const { product_items, product_id } = action.payload
      const productIndex = state.currentOrder.products.findIndex(
        (product) => product.product_id === product_id
      )
      if (productIndex !== -1) {
        state.currentOrder.products[productIndex].product_count++
      } else {
        state.currentOrder.products.push({
          ...action.payload,
          product_count: 1,
        })
      }

      //UPDATE ITEMS IN STATE
      for (let index = 0; index < product_items.length; index++) {
        const element = product_items[index]
        let itemCurrent = state.items.findIndex(
          (i) => i.item_id === element.item_id
        )
        state.items[itemCurrent].item_count = parserDecimals(
          state.items[itemCurrent].item_count - element.item_count
        )
      }
    },

    incrementQuantity: (state, action) => {
      const { product_items, product_id } = action.payload
      const productIndex = state.currentOrder.products.findIndex(
        (product) => product.product_id === product_id
      )
      if (productIndex !== -1) {
        state.currentOrder.products[productIndex].product_count++

        //UPDATE ITEMS IN STATE
        for (let index = 0; index < product_items.length; index++) {
          const element = product_items[index]
          let itemCurrent = state.items.findIndex(
            (i) => i.item_id === element.item_id
          )
          state.items[itemCurrent].item_count = parserDecimals(
            state.items[itemCurrent].item_count - element.item_count
          )
        }
      }
    },

    decrementQuantity: (state, action) => {
      const { product_items, product_id } = action.payload
      const productIndex = state.currentOrder.products.findIndex(
        (product) => product.product_id === product_id
      )
      if (productIndex !== -1) {
        state.currentOrder.products[productIndex].product_count = Math.max(
          1,
          state.currentOrder.products[productIndex].product_count - 1
        )

        //UPDATE ITEMS IN STATE
        for (let index = 0; index < product_items.length; index++) {
          const element = product_items[index]
          let itemCurrent = state.items.findIndex(
            (i) => i.item_id === element.item_id
          )
          state.items[itemCurrent].item_count = parserDecimals(
            state.items[itemCurrent].item_count + element.item_count
          )
        }
      }
    },

    removeItem: (state, action) => {
      const { product_items, product_id } = action.payload
      const index = state.currentOrder.products.findIndex(
        (item) => item.product_id === product_id
      )
      if (index !== -1) {
        state.currentOrder.products.splice(index, 1)

        //UPDATE ITEMS IN STATE
        for (let index = 0; index < product_items.length; index++) {
          const element = product_items[index]
          let itemCurrent = state.items.findIndex(
            (i) => i.item_id === element.item_id
          )
          state.items[itemCurrent].item_count = parserDecimals(
            state.items[itemCurrent].item_count + element.item_count
          )
        }
      }
    },

    addTableSelect: (
      state,
      action: PayloadAction<{ table_id: number; table_name: string }>
    ) => {
      const { table_id, table_name } = action.payload
      state.currentOrder.isTableSelected = true
      state.currentOrder.tableSelectId = table_id
      state.currentOrder.tableSelectName = table_name
    },
    addPersonalSelect: (
      state,
      action: PayloadAction<{
        personal_document: string
        personal_name: string
      }>
    ) => {
      const { personal_document, personal_name } = action.payload

      state.currentOrder.isPersonalSelected = true
      state.currentOrder.personalSelectDocument = personal_document
      state.currentOrder.personalSelectName = personal_name
    },
  },
})

export const {
  setInitialDataOrder,
  addToOrder,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addTableSelect,
  addPersonalSelect,
} = orderSlice.actions

export default orderSlice.reducer
