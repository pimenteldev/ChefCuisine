import { baseUrl } from "@/constants/utilitys"
import React from "react"

import { AppStore } from "@/redux/models/store"
import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useSelector } from "react-redux"
import useCartOrder from "../../hooks/useCartOrder"
import { currencyPrice } from "@/helpers/currencyPrice"

const CartContent = () => {
  const orders = useSelector((store: AppStore) => store.orders)
  const { currentOrder } = orders
  const { products } = currentOrder

  const {
    calculateTotalPrice,
    calculateSubTotalPrice,
    handleCleanProductsInOrder,
    handleIncrement,
    handleDecrement,
  } = useCartOrder()

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      style={{ padding: "10px 0" }}
    >
      {products.length === 0 ? (
        <Alert
          severity="info"
          style={{ margin: "10px 0px" }}
        >
          Sin Productos
        </Alert>
      ) : (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleCleanProductsInOrder}
          style={{
            width: "100%",
          }}
        >
          Vaciar Pedido
        </Button>
      )}
      {products.length >= 1 &&
        products.map((product) => (
          <React.Fragment key={product.product_id}>
            <ListItem
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar
                  alt={product.product_name}
                  src={baseUrl + product.product_photo}
                />
              </ListItemAvatar>
              <Box
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="h6"
                  variant="inherit"
                  color="text.primary"
                >
                  <strong>{product.product_name}</strong>
                </Typography>
                <Stack>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="inherit"
                    color="text.primary"
                  >
                    <small>P/Unitario:</small> {product.product_base_price}
                  </Typography>
                  {/* <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="inherit"
                    color="text.primary"
                  >
                    <small>Total:</small>{" "}
                    {product.product_count * product.product_base_price}
                  </Typography> */}
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
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      classes={{ root: "button" }}
                      onClick={() => handleDecrement(product)}
                    >
                      <Remove />
                    </IconButton>

                    <Paper
                      elevation={0}
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.04)",
                        padding: "5px 10px",
                        color: "#10b981",
                        margin: "0px 5px",
                      }}
                    >
                      <strong>{product.product_count}</strong>
                    </Paper>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      classes={{ root: "button" }}
                      onClick={() => handleIncrement(product)}
                    >
                      <Add />
                    </IconButton>
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
      <Stack>
        <ListItem
          style={{
            padding: "0px",
          }}
        >
          <Paper
            elevation={0}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#f5f5f5",
              padding: "10px",
            }}
          >
            <Typography
              component="span"
              variant="overline"
              color="GrayText"
              fontWeight="bold"
            >
              Subtotal
            </Typography>
            <Typography
              component="span"
              variant="h6"
              color="GrayText"
            >
              Bs {currencyPrice(calculateSubTotalPrice())}
            </Typography>{" "}
          </Paper>
        </ListItem>
        <ListItem
          style={{
            marginTop: "5px",
            padding: "0px",
          }}
        >
          <Paper
            elevation={0}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#f5f5f5",
              padding: "10px",
            }}
          >
            <Typography
              component="span"
              variant="overline"
              color="GrayText"
              fontWeight="bold"
            >
              Total
            </Typography>
            <Typography
              component="span"
              variant="h5"
              style={{
                color: "#10b981",
              }}
            >
              Bs {currencyPrice(calculateTotalPrice())}
            </Typography>{" "}
          </Paper>
        </ListItem>
      </Stack>
    </List>
  )
}

export default CartContent
