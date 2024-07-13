import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { baseUrl } from "@/constants"
import { Product } from "@/models"
import {
  CardProductBase,
  CardProductBody,
  CardProductBottom,
  CardProductBottomCategory,
  CardProductBottomStatus,
  CardProductFigure,
  CardProductFigureImg,
  CardProductIngredients,
  CardProductName,
  CardProductPrice,
  CardProductPriceAndIngredient,
  useProductsViewContext,
} from "@/pages"
import { Alert, Badge } from "@mui/material"
import { TruncateText } from "@/styled-components"
import { useSearchCategory } from "../../hooks"

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
          <TruncateText>{product.product_name}</TruncateText>
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
            {product.product_base_price.toLocaleString("es-VE", {
              style: "currency",
              currency: "VEF",
            })}
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
