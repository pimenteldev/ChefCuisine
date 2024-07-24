import { parserDecimals } from "@/helpers/math"
import {
  currentOrderEmptyState,
  Order,
  OrdersApi,
  OrdersEmptyState,
} from "@/models/orders"
import { ProductInOrder } from "@/models/products"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"
import { updateNewListItems } from "../hooks/useFunctionsStore"

export const orderKey = "order"

export const orderSlice = createSlice({
  name: orderKey,
  initialState: OrdersEmptyState,
  reducers: {
    setInitialDataOrder: (state, action: PayloadAction<OrdersApi>) => {
      const { payload } = action
      const { items, orders } = payload || {}

      const filteredOrders = orders.flatMap(function (order) {
        return order.order_list_inventary
      })

      const transformToProducts = filteredOrders.flatMap((prod) => {
        const { product } = prod
        const {
          product_id,
          product_base_price,
          product_category,
          product_name,
          product_description,
          product_items,
          product_photo,
          product_photo_thumb,
          product_status,
        } = product
        return {
          product_id: product_id,
          product_name: product_name,
          product_description: product_description,
          product_base_price: product_base_price,
          product_category: product_category,
          product_items: product_items,
          product_photo: product_photo,
          product_photo_thumb: product_photo_thumb,
          product_status: product_status,
          product_count: prod.product_count,
        }
      }) as ProductInOrder[]

      let newListItems = [...items]
      const list = [...state.currentOrder.products] as ProductInOrder[]
      console.log(transformToProducts)
      newListItems = updateNewListItems(
        newListItems,
        transformToProducts,
        list,
        1
      )

      return {
        ...state,
        ...payload,
        items: newListItems,
      }
    },
    addToOrder: (state, action: PayloadAction<ProductInOrder>) => {
      const { product_items, product_id } = action.payload

      return produce(state, (draftState) => {
        const productIndex = draftState.currentOrder.products.findIndex(
          (product) => product.product_id === product_id
        )

        if (productIndex !== -1) {
          draftState.currentOrder.products[productIndex].product_count++
        } else {
          draftState.currentOrder.products.push({
            ...action.payload,
            product_count: 1,
          })
        }

        for (let index = 0; index < product_items.length; index++) {
          const element = product_items[index]
          const itemCurrent = draftState.items.findIndex(
            (i) => i.item_id === element.item_id
          )
          draftState.items[itemCurrent].item_count = parserDecimals(
            draftState.items[itemCurrent].item_count - element.item_count
          )
        }
      })
    },
    incrementQuantity: (state, action: PayloadAction<ProductInOrder>) => {
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
    decrementQuantity: (state, action: PayloadAction<ProductInOrder>) => {
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
    removeItem: (state, action: PayloadAction<ProductInOrder>) => {
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
      state.currentOrder.orderId = crypto.randomUUID()
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
    toggleModalPreview: (state) => {
      state.currentOrder.isModalPreview = !state.currentOrder.isModalPreview
    },
    addOrderToCurrentOrder: (state, action: PayloadAction<Order>) => {
      const {
        order_id,
        order_table_id,
        order_personal_document,
        order_list_inventary,
      } = action.payload

      const tableInfo = state.tables.find((t) => t.table_id === order_table_id)
      const personalInfo = state.personal.find(
        (p) => p.personal_document === order_personal_document
      )

      const productsInOrder = order_list_inventary.map((p): ProductInOrder => {
        const { product, product_count } = p
        return {
          product_id: product.product_id,
          product_name: product.product_name,
          product_description: product.product_description,
          product_base_price: product.product_base_price,
          product_category: product.product_category,
          product_items: product.product_items,
          product_photo: product.product_photo,
          product_photo_thumb: product.product_photo_thumb,
          product_status: product.product_status,
          product_count: product_count,
        }
      })

      state.currentOrder.orderId = order_id
      state.currentOrder.isTableSelected = true
      state.currentOrder.tableSelectId = order_table_id
      state.currentOrder.tableSelectName = tableInfo.table_name
      state.currentOrder.isPersonalSelected = true
      state.currentOrder.personalSelectDocument = order_personal_document
      state.currentOrder.personalSelectName = personalInfo.personal_name
      state.currentOrder.products = productsInOrder
    },
    cleanCurrentOrder: (state) => {
      state.currentOrder = currentOrderEmptyState
    },
    cleanProductsInCurrentOrder: (state, action) => {
      state.currentOrder.products = []
    },
    removeProductInCurrentOrder: (state, action) => {
      const productToRemove = action.payload
      state.currentOrder.products = state.currentOrder.products.filter(
        (product) => product.product_id !== productToRemove.product_id
      )
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
  addOrderToCurrentOrder,
  cleanCurrentOrder,
  removeProductInCurrentOrder,
  cleanProductsInCurrentOrder,
  toggleModalPreview,
} = orderSlice.actions

export default orderSlice.reducer
