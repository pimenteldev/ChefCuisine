import { Container, Typography } from "@mui/material"
import { OrdersProvider } from "./Context/ContextProvider"
import OrderModule from "./components/OrderModule/OrderModule"
import DialogContainer from "./components/DialogContainer/DialogContainer"
import Cart from "./components/Cart/Cart"

export interface OrdersInterface {}

const Orders: React.FC<OrdersInterface> = () => {
  return (
    <OrdersProvider>
      <Container sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 0,
          }}
        >
          Pedidos
        </Typography>
        <OrderModule />
        <Cart />
        <DialogContainer />
      </Container>
    </OrdersProvider>
  )
}

export default Orders
