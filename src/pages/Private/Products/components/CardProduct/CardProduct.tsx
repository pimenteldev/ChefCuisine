import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog"
import { baseUrl } from "@/constants/utilitys"
import { Product } from "@/models/products"
import { Alert, Badge } from "@mui/material"
import { useProductsViewContext } from "../../contexts/ProductsView"
import useSearchCategory from "../../hooks/useSearchCategory"
import {
  CardProductBase,
  CardProductBody,
  CardProductFigure,
  CardProductFigureImg,
  CardProductName,
  CardProductPriceAndIngredient,
  CardProductIngredients,
  CardProductPrice,
  CardProductBottom,
  CardProductBottomCategory,
  CardProductBottomStatus,
} from "../../styled-components/CardProduct"
import { currencyPrice } from "@/helpers/currencyPrice"

interface CardProductInterface {
  product: Product
}

const CardProduct = ({ product }: CardProductInterface) => {
  const { setDialog } = useProductsViewContext()

  const { colorCategory } = useSearchCategory(product.product_category)

  let items = product.product_items?.length

  const handleClickModify = (product: Product) => {
    setDialog({ action: "modify", product })
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
        <CardProductName>
          <span className="truncateText">{product.product_name}</span>
        </CardProductName>
        <CardProductPriceAndIngredient>
          <CardProductIngredients>
            Ingredientes:
            <Badge
              color="primary"
              badgeContent={items}
              sx={{
                ml: 2,
              }}
            />
          </CardProductIngredients>
          <CardProductPrice>
            {currencyPrice.format(product.product_base_price)}
          </CardProductPrice>
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
              severity={product.product_status === 0 ? "error" : "success"}
              sx={{
                px: 1,
                py: 0,
              }}
            >
              {product.product_status === 0 ? "Inactivo" : "Activo"}
            </Alert>
          </CardProductBottomStatus>
        </CardProductBottom>
      </CardProductBody>
    </CardProductBase>
  )
}

export default CardProduct
