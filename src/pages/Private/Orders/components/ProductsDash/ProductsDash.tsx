import { Alert, Button, Container, Stack } from "@mui/material"
import useSelectors from "../../hooks/useSelectors"

import { CardProductsGrid } from "@/pages/Private/Products/styled-components/CardProduct"
import { AppStore } from "@/redux/models/store"
import { useSelector } from "react-redux"
import ProductCard from "../ProductCard/ProductCard"
import { useMemo } from "react"
import { roundDecimals } from "@/helpers/math"

const ProductsDash = () => {
  const { categories, currentOrder, products, items, handleClearOrder, state } =
    useSelectors()

  const itemsById = useMemo(() => {
    return items.reduce(
      (map, item) => ({
        ...map,
        [item.item_id]: roundDecimals(item.item_count, 2),
      }),
      {}
    )
  }, [items])

  return (
    <Container sx={{ mb: 4 }}>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleClearOrder}
        >
          Volver
        </Button>{" "}
        <Alert
          severity="info"
          style={{ width: "100%" }}
        >
          Agrega productos al Pedido
        </Alert>
      </Stack>

      <CardProductsGrid>
        {products?.length === 0 && (
          <Alert severity="info">No existen Productos en el Sistema</Alert>
        )}

        {products?.map((product) => {
          const product_items_disponibles = product.product_items.map(
            (product_item) =>
              roundDecimals(
                itemsById[product_item.item_id] / product_item.item_count,
                2
              )
          )

          const minimumQuantity = product_items_disponibles.reduce(
            (minimoActual, item) => Math.min(minimoActual, item),
            Infinity
          )
          const colorCategory = categories.find(
            (cate) => cate.category_id === product.product_category
          )

          return (
            <ProductCard
              key={product.product_id}
              product={product}
              colorCategory={colorCategory}
              minimumQuantity={Math.floor(minimumQuantity)}
            />
          )
        })}
      </CardProductsGrid>
    </Container>
  )
}

export default ProductsDash
