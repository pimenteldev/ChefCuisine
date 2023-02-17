import {dialogOpenSubject$} from '@/components/CustomDialog/CustomDialog.component'
import {baseUrl} from '@/constants'
import {Product} from '@/models'
import {useGetAllProducts, useProductsViewContext} from '@/pages'
import {AppStore} from '@/redux/store'
import {Alert, Avatar, Badge, Box, Card, CardContent, Divider, Grid, Typography} from '@mui/material'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

interface ProductsList {
  products: Product[]
}

function ProductsList() {
  const {callToEndPointsAndDispatchs} = useGetAllProducts()
  const {products, categories} = useSelector((store: AppStore) => store.productsViewState)
  const {setDialog} = useProductsViewContext()

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

  const handleClickModify = (product: Product) => {
    setDialog({action: 'modify', product})
    dialogOpenSubject$.setSubject = true
  }

  return (
    <Grid
      container
      spacing={1}
    >
      {products.length >= 1 ? (
        <>
          {' '}
          {products?.map((product: Product) => {
            let colorCategory = categories.filter(({category_id}) => category_id === product.product_category)
            let items = product.product_items?.length
            return (
              <Grid
                key={product.product_id}
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    cursor: 'pointer',
                    '&:hover img': {transition: 'transform 0.5s ease', transform: 'scale(1.1)'},
                  }}
                  onClick={() => handleClickModify(product)}
                >
                  <Avatar
                    alt="Product"
                    src={baseUrl + product.product_photo}
                    variant="square"
                    sx={{
                      width: '100%',
                      p: 0,
                      m: 0,
                      minHeight: 180,
                      overflow: 'hidden',
                      borderRadius: '1 1 0 0',
                      objectFit: 'cover',
                    }}
                  />

                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="overline"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      p: 0,
                      position: 'relative',
                    }}
                  >
                    {product.product_name}
                  </Typography>

                  <CardContent
                    sx={{
                      p: 1,
                    }}
                  >
                    <Typography
                      align="center"
                      color="textPrimary"
                      variant="body2"
                      sx={{
                        minHeight: 50,
                      }}
                    >
                      {product.product_description}
                    </Typography>

                    <Typography
                      align="center"
                      color="textPrimary"
                      variant="body2"
                      sx={{
                        my: 2,
                      }}
                    >
                      Ingredientes:
                      <Badge
                        color="success"
                        badgeContent={items}
                        sx={{
                          ml: 2,
                        }}
                      />
                    </Typography>

                    <Box sx={{width: '100%', textAlign: 'center'}}>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="h6"
                      >
                        {product.product_base_price.toFixed(2)} Bs
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{flexGrow: 1}} />
                  <Divider />
                  <Box sx={{p: 1}}>
                    <Grid
                      container
                      sx={{justifyContent: 'space-between'}}
                    >
                      <Grid
                        item
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            px: 1,
                            py: 1,
                            backgroundColor: colorCategory[0]?.category_color,
                            color: 'white',
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            display="inline"
                            variant="body2"
                          >
                            {colorCategory[0]?.category_name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          color: 'primary.main',
                        }}
                      >
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
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </>
      ) : (
        <>
          <Alert
            severity="info"
            sx={{width: '100%'}}
          >
            No existen Productos Registrados
          </Alert>
        </>
      )}
    </Grid>
  )
}

export default ProductsList
