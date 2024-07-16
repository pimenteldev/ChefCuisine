import { Container, Typography } from "@mui/material"
import { SelectedTable } from "./components"
import useSelectTable from "./hooks/useSelectTable"


function Orders() {
  const { isTableSelected } = useSelectTable()

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          mt: 1,
          mb: 0,
        }}
      >
        Pedidos
      </Typography>

      {isTableSelected && <SelectedTable />}
      {!isTableSelected && <>isTableSelected</>}
    </Container>
  )
}

export default Orders
