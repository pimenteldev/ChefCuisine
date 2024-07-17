import { baseUrl } from "@/constants/utilitys"
import { currencyPrice } from "@/helpers/currencyPrice"
import { decrementQuantity, incrementQuantity } from "@/redux/slices/orderSlice"
import { AppStore } from "@/redux/store"
import {
  Alert,
  Avatar,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
const CartContent = () => {
  const currentOrder = useSelector((store: AppStore) => store.currentOrder)
  const dispatch = useDispatch()

  const handleIncrement = (product_id: string) => {
    dispatch(incrementQuantity(product_id))
  }

  const handleDecrement = (product_id: string) => {
    dispatch(decrementQuantity(product_id))
  }

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      style={{ padding: "0px" }}
    >
      {currentOrder.products.length === 0 && (
        <Alert severity="info">Sin Productos</Alert>
      )}
      {currentOrder.products.length >= 1 &&
        currentOrder.products.map((product) => (
          <>
            <ListItem
              alignItems="flex-start"
              style={{ padding: "0px" }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={product.product_name}
                  src={baseUrl + product.product_photo}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="h6"
                    variant="inherit"
                    color="text.primary"
                  >
                    <strong>{product.product_name.toLocaleUpperCase()}</strong>
                  </Typography>
                }
                secondary={
                  <Stack
                    justifyContent={"space-between"}
                    display={"inline-flex"}
                  >
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      <small>P/Unitario:</small>{" "}
                      {currencyPrice(product.product_base_price)}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      <small>Total:</small>{" "}
                      {currencyPrice(
                        product.product_count * product.product_base_price
                      )}
                    </Typography>
                    <Stack
                      style={{
                        padding: "0px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => handleDecrement(product.product_id)}
                      >
                        <strong>-</strong>
                      </Button>

                      <Button
                        size="small"
                        color="primary"
                        variant="text"
                      >
                        <strong>{product.product_count}</strong>
                      </Button>

                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => handleIncrement(product.product_id)}
                      >
                        <strong>+</strong>
                      </Button>
                    </Stack>
                  </Stack>
                }
              />
            </ListItem>
            <Divider
              variant="fullWidth"
              component="li"
            />
          </>
        ))}
    </List>
  )
}

export default CartContent
