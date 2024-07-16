import { setInitialData } from "@/redux/slices/ordersSlice"
import { AppStore } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../services"

const useInitialGetData = () => {
  const dispatch = useDispatch()

  const tables = useSelector((store: AppStore) => store.orders.tables)
  const orders = useSelector((store: AppStore) => store.orders.orders)
  const personal = useSelector((store: AppStore) => store.orders.personal)
  const role = useSelector((store: AppStore) => store.orders.role)

  const products = useSelector((store: AppStore) => store.orders.products)
  const categories = useSelector((store: AppStore) => store.orders.categories)
  const items = useSelector((store: AppStore) => store.orders.items)
  const settings = useSelector((store: AppStore) => store.orders.settings)

  const dispatchGetData = async () => {
    await getAllOrders()
      .then((json) => {
        dispatch(setInitialData(json))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    tables,
    orders,
    personal,
    role,
    products,
    categories,
    items,
    settings,
    dispatchGetData,
  }
}

export default useInitialGetData
