import { useState } from "react"
import { useDispatch } from "react-redux"
import { getAllTables } from "../services"
import { setDataInViewTable } from "@/redux/slices/tablesView.slice"

function useGetAllTables() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const callToEndPointsAndDispatchs = async () => {
    setLoading(true)
    await getAllTables()
      .then((json) => {
        dispatch(setDataInViewTable(json))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return { callToEndPointsAndDispatchs, loading }
}

export default useGetAllTables
