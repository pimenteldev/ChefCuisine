import { baseUrl } from "@/constants"
import { Product } from "@/models"
import { useInitialGetData } from "@/pages/Private/Orders"
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Tooltip,
  Stack,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material"

interface Props {
  handleSelectProduct: (product: Product) => void
}

const CardProductsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minMax(200px, 1fr))",
  gap: "10px",
}

const ProductsDash: React.FC<Props> = (props) => {
  const { handleSelectProduct } = props
  const { products, categories, items, settings } = useInitialGetData()

  return (
    <Container sx={{ mb: 4 }}>
      <Alert
        variant="standard"
        severity={"info"}
        sx={{
          px: 1,
          py: 0,
          mt: 1,
          mb: 2,
        }}
      >
        Agrega productos al pedido
      </Alert>
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
              onClick={() => handleSelectProduct(product)}
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
                      {product.product_base_price.toLocaleString("es-VE", {
                        style: "currency",
                        currency: "BSF",
                      })}
                    </Typography>
                    <Tooltip
                      title={product.product_description}
                      arrow
                    >
                      <Button>Descripción</Button>
                    </Tooltip>
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
