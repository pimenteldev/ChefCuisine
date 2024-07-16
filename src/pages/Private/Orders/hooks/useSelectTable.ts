import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../services"
import { setInitialData } from "@/redux/slices/ordersSlice"
import { AppStore } from "@/redux/store"

const useSelectTable = () => {
  const dispatch = useDispatch()

  const tables = useSelector((store: AppStore) => store.orders.tables)
  const orders = useSelector((store: AppStore) => store.orders.orders)
  const personal = useSelector((store: AppStore) => store.orders.personal)

  const [isTableSelected, setIsTableSelected] = useState(true)

  const dispatchGetData = async () => {
    await getAllOrders()
      .then((json) => {
        dispatch(setInitialData(json))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSelectTable = () => {
    setIsTableSelected(!isTableSelected)
  }

  useEffect(() => {
    dispatchGetData()
  }, [])

  return {
    isTableSelected,
    tables,
    orders,
    personal,
    handleSelectTable,
  }
}

export default useSelectTable
