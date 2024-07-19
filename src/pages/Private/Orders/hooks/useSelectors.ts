import { AppStore } from "@/redux/models/store"
import { useDispatch, useSelector } from "react-redux"
import getAllOrders from "../services/getAllOrders"

import { ProductInOrder } from "@/models/products"
import {
  setInitialDataOrder,
  addToOrder,
  incrementQuantity,
} from "@/redux/slices/orderSlice"
import { useEffect, useMemo } from "react"
import { AlertColor } from "@mui/material"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"

const useSelectors = () => {
  const dispatch = useDispatch()

  const categories = useSelector((state: AppStore) => state.orders.categories)
  const currentOrder = useSelector(
    (state: AppStore) => state.orders.currentOrder
  )
  const items = useSelector((state: AppStore) => state.orders.items)
  const items_categories = useSelector(
    (state: AppStore) => state.orders.items_categories
  )
  const orders = useSelector((state: AppStore) => state.orders.orders)
  const personal = useSelector((state: AppStore) => state.orders.personal)
  const products = useSelector((state: AppStore) => state.orders.products)
  const role = useSelector((state: AppStore) => state.orders.role)
  const settings = useSelector((state: AppStore) => state.orders.settings)
  const tables = useSelector((state: AppStore) => state.orders.tables)
  const units = useSelector((state: AppStore) => state.orders.units)

  const {
    isTableSelected,
    tableSelectName,
    isPersonalSelected,
    personalSelectName,
  } = currentOrder

  const dispatchGetData = async () => {
    await getAllOrders()
      .then((json) => {
        dispatch(setInitialDataOrder(json))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSelectProduct = (productSelect: ProductInOrder) => {
    const productFilter = currentOrder.products.filter(
      (product) => product.product_id === productSelect.product_id
    )

    if (productFilter.length === 0) {
      dispatch(addToOrder(productSelect))
    } else {
      dispatch(incrementQuantity(productSelect))
    }
  }

  const countProductsInOrder = currentOrder.products.reduce(
    (acumulador, { product_count }) => acumulador + product_count,
    0
  )

  return {
    categories,
    currentOrder,
    items,
    items_categories,
    orders,
    personal,
    products,
    role,
    settings,
    tables,
    units,
    isTableSelected,
    tableSelectName,
    isPersonalSelected,
    personalSelectName,
    dispatchGetData,
    handleSelectProduct,
    countProductsInOrder,
  }
}

export default useSelectors
function updateDataOrder(): any {
  throw new Error("Function not implemented.")
}
