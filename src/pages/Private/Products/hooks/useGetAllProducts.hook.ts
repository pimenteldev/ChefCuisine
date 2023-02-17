import {getAllProducts} from '@/pages'
import {setDataInViewProducts} from '@/redux/slices/productsView.slice'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

function useGetAllProducts() {
  const dispatch = useDispatch()

  const callToEndPointsAndDispatchs = async () => {
    await getAllProducts()
      .then((json) => {
        dispatch(setDataInViewProducts(json))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

  return {callToEndPointsAndDispatchs}
}

export default useGetAllProducts
