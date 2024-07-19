import React from "react"
import { baseUrl } from "@/constants/utilitys"
import { currencyPrice } from "@/helpers/currencyPrice"
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/slices/orderSlice"
import { AppStore } from "@/redux/models/store"
import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import {
  Alert,
  AlertColor,
  Avatar,
  Box,
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
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
const CartContent = () => {
  const orders = useSelector((store: AppStore) => store.orders)
  const { currentOrder } = orders
  const { products } = currentOrder

  const dispatch = useDispatch()

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product))
  }

  const handleDecrement = (product) => {
    if (product.product_count === 1) {
      dispatch(removeItem(product))
      handleSnackBar(`Has Eliminado un Producto del Pedido`, "warning")
    } else {
      dispatch(decrementQuantity(product))
    }
  }

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      style={{ padding: "0px" }}
    >
      {products.length === 0 && <Alert severity="info">Sin Productos</Alert>}
      {products.length >= 1 &&
        products.map((product) => (
          <React.Fragment key={product.product_id}>
            <ListItem
              alignItems="flex-start"
              style={{ padding: "10px 0px" }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={product.product_name}
                  src={baseUrl + product.product_photo}
                />
              </ListItemAvatar>
              <Box>
                <Typography
                  sx={{ display: "inline" }}
                  component="h6"
                  variant="inherit"
                  color="text.primary"
                >
                  <strong>{product.product_name.toLocaleUpperCase()}</strong>
                </Typography>
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
                      padding: "10px 0px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "-30px",
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => handleDecrement(product)}
                    >
                      <Remove />
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
                      onClick={() => handleIncrement(product)}
                    >
                      <Add />
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </ListItem>
            <Divider
              variant="fullWidth"
              component="li"
            />
          </React.Fragment>
        ))}
    </List>
  )
}

export default CartContent
