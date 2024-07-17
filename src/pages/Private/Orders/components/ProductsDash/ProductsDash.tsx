import { baseUrl } from "@/constants/utilitys"
import { currencyPrice } from "@/helpers/currencyPrice"
import { ProductInOrder } from "@/models/products"
import { addToOrder } from "@/redux/slices/orderSlice"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography
} from "@mui/material"
import { useDispatch } from "react-redux"
import useInitialGetData from "../../hooks/useInitialGetData"
import Cart from "../Cart/Cart"

const CardProductsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minMax(200px, 1fr))",
  gap: "10px",
}

const ProductsDash = () => {
  const { products, categories, items, settings } = useInitialGetData()

  const dispatch = useDispatch()

  const handleSelectProduct = (productSelect: ProductInOrder) => {
    dispatch(addToOrder(productSelect))
  }

  return (
    <Container sx={{ mb: 4 }}>
      <Cart />

      <div style={CardProductsGrid}>
        {products?.length === 0 && <>No existen Productos en el Sistema</>}

        {products?.map((product) => {
          const colorCategory = categories.filter(
            (cate) => product.product_category === cate.category_id
          )
          return (
            <Card
              sx={{ maxWidth: 345 }}
              key={product.product_id}
            >
              <CardActionArea onClick={() => handleSelectProduct(product)}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{
                    backgroundColor: colorCategory[0]?.category_color,
                    padding: "10px",
                  }}
                >
                  <Chip
                    label={colorCategory[0]?.category_name}
                    style={{
                      color: "white",
                    }}
                  />
                </Stack>

                <CardMedia
                  component="img"
                  height="194"
                  image={baseUrl + product.product_photo}
                  alt={product.product_name}
                />
                <Stack
                  direction="column"
                  spacing={2}
                >
                  <Typography
                    variant="h6"
                    color="white"
                    style={{
                      position: "absolute",
                      marginTop: "-29px",
                      backgroundColor: "#10b981",
                      width: "100%",
                      textAlign: "center",
                    }}
                    noWrap
                  >
                    {product.product_name}
                  </Typography>
                </Stack>

                <CardContent>
                  <Stack
                    direction="column"
                    spacing={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    >
                      {currencyPrice(product.product_base_price)}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </div>
    </Container>
  )
}

export default ProductsDash
