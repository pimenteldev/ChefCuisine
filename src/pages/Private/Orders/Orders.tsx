import { Container, Typography } from "@mui/material"
import { SelectedTable } from "./components"
import useInitialGetData from "./hooks/useInitialGetData"
import { useEffect, useState } from "react"

function Orders() {
  const { dispatchGetData } = useInitialGetData()

  const [isTableSelected, setIsTableSelected] = useState(true)

  const handleSelectTable = () => {
    setIsTableSelected(!isTableSelected)
  }

  useEffect(() => {
    dispatchGetData()
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

      {isTableSelected && (
        <SelectedTable handleSelectTable={handleSelectTable} />
      )}
      {!isTableSelected && <>isTableSelected</>}
    </Container>
  )
}

export default Orders
