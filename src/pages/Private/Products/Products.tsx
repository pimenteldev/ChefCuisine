import { Typography } from "@mui/material"
import Container from "@mui/material/Container"
import React from "react"
import DialogContainer from "./components/DialogContainer/DialogContainer"
import FabButton from "./components/FabButton/FabButton"
import ProductsList from "./components/ProductsList/ProductsList"
import { ProductsProvider } from "./contexts/ProductsView"

export interface ProductsInterface {}

const Products: React.FC<ProductsInterface> = () => {
  return (
    <ProductsProvider>
      <Container sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 0,
          }}
        >
          Productos
        </Typography>
        <ProductsList />
        <FabButton />
        <DialogContainer />
      </Container>
    </ProductsProvider>
  )
}

export default Products
