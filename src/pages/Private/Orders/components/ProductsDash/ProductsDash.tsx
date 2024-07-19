import { baseUrl } from "@/constants/utilitys"
import { currencyPrice } from "@/helpers/currencyPrice"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material"
import useSelectors from "../../hooks/useSelectors"

import { CardProductsGrid } from "@/pages/Private/Products/styled-components/CardProduct"
import { AppStore } from "@/redux/models/store"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const ProductsDash = () => {
  const {
    categories,
    currentOrder,
    items_categories,
    orders,
    personal,
    products,
    role,
    settings,
    tables,
    units,
    items,
    handleSelectProduct,
  } = useSelectors()

  const state = useSelector((state: AppStore) => state)

  return (
    <Container sx={{ mb: 4 }}>
      {JSON.stringify(state.orders.items.filter((i) => i.item_id === 22))}

      <CardProductsGrid>
        {products?.length === 0 && <>No existen Productos en el Sistema</>}

        {products?.map((product) => {
          const itemsById = useMemo(
            () =>
              items.reduce((map, item) => {
                map[item.item_id] = item.item_count
                return map
              }, {}),
            [items]
          )

          const product_items_disponibles = product.product_items.map(
            (product_item) =>
              Math.floor(
                itemsById[product_item.item_id] / product_item.item_count
              )
          )

          const minDisp = Math.min(...product_items_disponibles)

          const colorCategory = categories.find(
            (cate) => cate.category_id === product.product_category
          )

          return (
            <Card
              sx={{ maxWidth: 345, position: "relative", cursor: "pointer" }}
              key={product.product_id}
            >
              <CardActionArea onClick={() => handleSelectProduct(product)}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  style={{
                    backgroundColor: colorCategory.category_color,
                    padding: "10px",
                  }}
                >
                  <Chip
                    label={colorCategory.category_name}
                    style={{
                      color: "white",
                    }}
                  />
                  <Chip
                    label={minDisp}
                    variant="filled"
                    style={{
                      color: "white",
                      fontWeight: "bolder",
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
      </CardProductsGrid>
    </Container>
  )
}

export default ProductsDash
