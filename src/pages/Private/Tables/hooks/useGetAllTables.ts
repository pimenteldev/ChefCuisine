import { useState } from "react"
import { useDispatch } from "react-redux"
import { setDataInTable } from "@/redux/slices/tablesSlice"
import getAllTables from "../services/getAllTables"

function useGetAllTables() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const callToEndPointsAndDispatchs = async () => {
    setLoading(true)
    await getAllTables()
      .then((json) => {
        dispatch(setDataInTable(json))
      })
      .catch((err: string) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return { callToEndPointsAndDispatchs, loading }
}

export default useGetAllTables
