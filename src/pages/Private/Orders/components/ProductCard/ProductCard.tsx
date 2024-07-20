import React from "react"
import useSelectors from "../../hooks/useSelectors"
import { baseUrl } from "@/constants/utilitys"
import { currencyPrice } from "@/helpers/currencyPrice"
import {
  Card,
  CardActionArea,
  Stack,
  Chip,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material"

const ProductCard = ({ product, colorCategory, minimumQuantity }) => {
  const { handleSelectProduct } = useSelectors()

  return (
    <Card
      sx={{ maxWidth: 345 }}
      key={product.product_id}
      style={{
        opacity: minimumQuantity <= 0 ? 0.5 : 1,
        cursor: minimumQuantity <= 0 ? "not-allowed" : "pointer",
      }}
    >
      <CardActionArea
        onClick={() => handleSelectProduct(product)}
        disabled={true}
      >
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
            label={minimumQuantity}
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
              {product.product_base_price}
            </Typography>
            {/* <ul>
              {product.product_items.map((i) => (
                <li key={i.item_id}>
                  <>
                    {i.item_id}
                    {" - "}
                  </>
                  <>
                    {i.item_name}
                    {" - "}
                  </>
                  <>
                    {i.item_count} {" - "}
                  </>
                  <>
                    {i.item_count * minimumQuantity} {" - "}
                  </>
                  <>{minimumQuantity}</>
                </li>
              ))}
            </ul> */}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
