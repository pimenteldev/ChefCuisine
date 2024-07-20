import { AppStore } from "@/redux/models/store"
import { useDispatch, useSelector } from "react-redux"
import getAllOrders from "../services/getAllOrders"

import { ProductInOrder } from "@/models/products"
import {
  addToOrder,
  incrementQuantity,
  setInitialDataOrder,
  clearCurrentOrder,
} from "@/redux/slices/orderSlice"

const useSelectors = () => {
  const dispatch = useDispatch()

  const {
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
  } = useSelector((state: AppStore) => state.orders)
  const state = useSelector((state: AppStore) => state)

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

  const handleSelectProduct = (selectedProduct: ProductInOrder) => {
    const isProductAlreadyInOrder = currentOrder.products.some(
      (product) => product.product_id === selectedProduct.product_id
    )

    if (!isProductAlreadyInOrder) {
      dispatch(addToOrder(selectedProduct))
    } else {
      dispatch(incrementQuantity(selectedProduct))
    }
  }

  const countProductsInOrder = currentOrder.products.reduce(
    (acumulador, { product_count }) => acumulador + product_count,
    0
  )

  const handleClearOrder = () => {
    dispatch(clearCurrentOrder())
  }

  

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
    handleClearOrder,
    state,
  }
}

export default useSelectors
