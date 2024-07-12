import {Product} from '@/models'
import {CardProduct, CardProductsGrid, useGetAllProducts} from '@/pages'
import {AppStore} from '@/redux/store'
import {Alert} from '@mui/material'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

function ProductsList() {
  const {callToEndPointsAndDispatchs} = useGetAllProducts()
  const {products} = useSelector((store: AppStore) => store.productsViewState)

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

  return products.length >= 1 ? (
    <CardProductsGrid>
      {products.map((product: Product) => {
        return (
          <CardProduct
            key={product.product_id}
            product={product}
          />
        )
      })}
    </CardProductsGrid>
  ) : (
    <Alert severity="info">No existen Productos Registrados</Alert>
  )
}

export default ProductsList
