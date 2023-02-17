import {CustomDialog} from '@/components'
import {Typography} from '@mui/material'
import Container from '@mui/material/Container'
import React, {useState} from 'react'
import {AddProduct, DialogContainer, ProductsList} from './components'
import {FabButton} from './components/FabButton'
import {ModifyProduct} from './components/ModifyProduct'
import {ProductsProvider} from './contexts'

export interface ProductsInterface {}

const Products: React.FC<ProductsInterface> = () => {
  return (
    <ProductsProvider>
      <Container sx={{mb: 4}}>
        <Typography
          variant="h4"
          sx={{mb: 1}}
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
