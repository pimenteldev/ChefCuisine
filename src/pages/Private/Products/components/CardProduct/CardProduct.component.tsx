import {dialogOpenSubject$} from '@/components/CustomDialog/CustomDialog.component'
import {baseUrl} from '@/constants'
import {Product} from '@/models'
import {
  CardProductBase,
  CardProductBody,
  CardProductBottom,
  CardProductBottomCategory,
  CardProductBottomStatus,
  CardProductDescription,
  CardProductFigure,
  CardProductFigureImg,
  CardProductIngredients,
  CardProductName,
  CardProductPrice,
  CardProductPriceAndIngredient,
  useProductsViewContext,
} from '@/pages'
import {Alert, Badge} from '@mui/material'

import {AppStore} from '@/redux/store'
import {TruncateText} from '@/styled-components'
import {useSelector} from 'react-redux'

interface CardProductInterface {
  product: Product
}

const CardProduct = ({product}: CardProductInterface) => {
  const {setDialog} = useProductsViewContext()

  const {categories} = useSelector((store: AppStore) => store.productsViewState)
  let colorCategory = categories.filter(({category_id}) => category_id === product.product_category)
  let items = product.product_items?.length

  const handleClickModify = (product: Product) => {
    setDialog({action: 'modify', product})
    dialogOpenSubject$.setSubject = true
  }

  return (
    <CardProductBase onClick={() => handleClickModify(product)}>
      <CardProductBody>
        <CardProductFigure>
          <CardProductFigureImg
            alt="Product"
            src={baseUrl + product.product_photo}
            role="img"
            loading="lazy"
          />
        </CardProductFigure>
        <CardProductName>{product.product_name}</CardProductName>
        <CardProductDescription>
          <TruncateText>{product.product_description}</TruncateText>
        </CardProductDescription>
        <CardProductPriceAndIngredient>
          <CardProductIngredients>
            Ingredientes:
            <Badge
              color="success"
              badgeContent={items}
              sx={{
                ml: 2,
              }}
            />
          </CardProductIngredients>
          <CardProductPrice>{product.product_base_price.toFixed(2)} Bs</CardProductPrice>
        </CardProductPriceAndIngredient>

        <CardProductBottom>
          <CardProductBottomCategory
            style={{
              backgroundColor: colorCategory[0]?.category_color,
            }}
          >
            {colorCategory[0]?.category_name}
          </CardProductBottomCategory>
          <CardProductBottomStatus>
            <Alert
              variant="outlined"
              severity={product.product_status === 0 ? 'error' : 'success'}
              sx={{
                px: 1,
                py: 0,
              }}
            >
              {product.product_status === 0 ? 'Inactivo' : 'Activo'}
            </Alert>
          </CardProductBottomStatus>
        </CardProductBottom>
      </CardProductBody>
    </CardProductBase>
  )
}

export default CardProduct
