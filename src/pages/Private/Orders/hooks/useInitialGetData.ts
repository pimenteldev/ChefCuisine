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
    dispatchGetData,
  }
}

export default useInitialGetData
