import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import { Breadcrumbs, Container, Link, Typography } from "@mui/material"
import { useEffect } from "react"
import ProductsDash from "./components/ProductsDash/ProductsDash"
import SelectedPersonal from "./components/SelectedPersonal/SelectedPersonal"
import SelectedTable from "./components/SelectedTable/SelectedTable"
import useSelectors from "./hooks/useSelectors"

function Orders() {
  const {
    dispatchGetData,
    isTableSelected,
    tableSelectName,
    isPersonalSelected,
    personalSelectName,
    currentOrder,
  } = useSelectors()

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
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{
          padding: "10px",
        }}
      >
        {isTableSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <TableRestaurantIcon
              fontSize="large"
              color="secondary"
              sx={{
                backgroundColor: "#10b981",
                borderRadius: "100%",
                padding: "5px",
                marginRight: "5px",
              }}
            />
            Mesa: {tableSelectName}
          </Link>
        )}
        {isPersonalSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <AccountCircleIcon
              fontSize="large"
              color="secondary"
              sx={{
                backgroundColor: "#10b981",
                borderRadius: "100%",
                padding: "5px",
                marginRight: "5px",
              }}
            />
            Mesonero: {personalSelectName}
          </Link>
        )}
      </Breadcrumbs>

      {!isTableSelected && <SelectedTable />}
      {isTableSelected && !isPersonalSelected && <SelectedPersonal />}
      {isTableSelected && isPersonalSelected && <ProductsDash />}
    </Container>
  )
}

export default Orders
