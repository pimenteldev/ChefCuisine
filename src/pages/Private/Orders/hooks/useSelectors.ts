import { AppStore } from "@/redux/models/store"
import { useDispatch, useSelector } from "react-redux"
import getAllOrders from "../services/getAllOrders"
import { roundDecimals } from "@/helpers/math"
import { setInitialDataOrder } from "@/redux/slices/orderSlice"
import { useMemo } from "react"

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
    isModalPreview,
  } = currentOrder

  const dispatchGetData = async () => {
    await getAllOrders()
      .then((json) => {
        dispatch(setInitialDataOrder(json))
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  const countProductsInOrder = currentOrder.products.reduce(
    (acumulador, { product_count }) => acumulador + product_count,
    0
  )

  const itemsById = useMemo(() => {
    return items.reduce(
      (map, item) => ({
        ...map,
        [item.item_id]: roundDecimals(item.item_count, 2),
      }),
      {}
    )
  }, [items])

  return {
    categories,
    currentOrder,
    items,
    itemsById,
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
    isModalPreview,
    dispatchGetData,
    countProductsInOrder,
    state,
  }
}

export default useSelectors
