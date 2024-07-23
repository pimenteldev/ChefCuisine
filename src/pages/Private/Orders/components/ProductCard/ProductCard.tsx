import { baseUrl } from "@/constants/utilitys"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material"
import useCartOrder from "../../hooks/useCartOrder"
import { currencyPrice } from "@/helpers/currencyPrice"
import "./productCard.css"

const ProductCard = ({ product, colorCategory, minimumQuantity }) => {
  const { handleProductActions } = useCartOrder()

  return (
    <Card
      key={product.product_id}
      style={{
        opacity: minimumQuantity <= 0 ? 0.5 : 1,
        cursor: minimumQuantity <= 0 ? "not-allowed" : "pointer",
      }}
      className="card-product-order"
    >
      <CardActionArea
        onClick={() => handleProductActions("addProduct", product)}
        disabled={minimumQuantity <= 0 ? true : false}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{
            backgroundColor: colorCategory.category_color,
            padding: "5px",
          }}
        >
          <Chip
            label={colorCategory.category_name}
            style={{
              color: "white",
              fontSize: "12px",
            }}
          />
          <Chip
            label={minimumQuantity}
            variant="filled"
            style={{
              color: "white",
              fontWeight: "bolder",
            }}
          />
        </Stack>
        <figure>
          <CardMedia
            component="img"
            height="150"
            image={baseUrl + product.product_photo}
            alt={product.product_name}
          />
        </figure>
        <Box
          style={{
            height: "35px",
            position: "absolute",
            marginTop: "-35px",
            width: "100%",
            padding: "0px 10px",
            textAlign: "center",
            backgroundColor: "var(--primary-color-transparent)",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            fontWeight={"bold"}
            noWrap
          >
            {currencyPrice.format(product.product_base_price)}
          </Typography>
        </Box>
        <Box
          style={{
            height: "45px",
            width: "100%",
            padding: "10px 10px",
            textAlign: "center",
            backgroundColor: "var(--background-color-secondary)",
            marginTop: "0px",
          }}
        >
          <Typography
            variant="button"
            color="secundary"
            fontWeight={"bold"}
            noWrap
            align="center"
          >
            {product.product_name}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
