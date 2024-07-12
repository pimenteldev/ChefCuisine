import { getAllProducts } from "@/pages"
import { setDataInViewProducts } from "@/redux/slices/productsView.slice"
import { useState } from "react"
import { useDispatch } from "react-redux"

function useGetAllProducts() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const callToEndPointsAndDispatchs = async () => {
    setLoading(true)
    await getAllProducts()
      .then((json) => {
        dispatch(setDataInViewProducts(json))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return { callToEndPointsAndDispatchs, loading }
}

export default useGetAllProducts
