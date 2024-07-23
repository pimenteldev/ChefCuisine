import { Alert, Button, Container, Grid, Paper, Stack } from "@mui/material"
import useSelectors from "../../hooks/useSelectors"
import { roundDecimals } from "@/helpers/math"
import { useMemo, useState } from "react"
import useCartOrder from "../../hooks/useCartOrder"
import ProductCard from "../ProductCard/ProductCard"

const ProductsDash = () => {
  const { categories, itemsById, products } = useSelectors()
  const [productsList] = useState(products || [])
  const { filterProducts } = useCartOrder()

  const productsFiltered = filterProducts(productsList)

  return (
    <Grid
      container
      columns={12}
    >
      {productsFiltered?.length === 0 && (
        <Alert severity="info">No existen Productos en el Sistema</Alert>
      )}

      {productsFiltered?.map((product) => {
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
          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            lg={2}
            sx={{
              p: "5px",
            }}
            key={product.product_id}
          >
            <ProductCard
              product={product}
              colorCategory={colorCategory}
              minimumQuantity={Math.floor(minimumQuantity)}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductsDash
