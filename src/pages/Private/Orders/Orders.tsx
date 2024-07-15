import { Container, Typography } from "@mui/material"
import { SelectedTable } from "./components"
import useSelectTable from "./hooks/useSelectTable"
import { useGetAllTables } from "@/pages"
import { useEffect } from "react"

function Orders() {
  const { isTableSelected, tables } = useSelectTable()
  const { callToEndPointsAndDispatchs } = useGetAllTables()

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

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

      {isTableSelected && <SelectedTable data={tables} />}
    </Container>
  )
}

export default Orders
