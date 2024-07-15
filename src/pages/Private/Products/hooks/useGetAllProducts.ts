import { getAllProducts } from "@/pages"
import { setDataInProducts } from "@/redux/slices/products"
import { useState } from "react"
import { useDispatch } from "react-redux"

function useGetAllProducts() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const callToEndPointsAndDispatchs = async () => {
    setLoading(true)
    await getAllProducts()
      .then((json) => {
        dispatch(setDataInProducts(json))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return { callToEndPointsAndDispatchs, loading }
}

export default useGetAllProducts
