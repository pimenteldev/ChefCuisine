import { AppStore } from "@/redux/store"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import { Breadcrumbs, Container, Link, Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import ProductsDash from "./components/ProductsDash/ProductsDash"
import SelectedPersonal from "./components/SelectedPersonal/SelectedPersonal"
import SelectedTable from "./components/SelectedTable/SelectedTable"
import useInitialGetData from "./hooks/useInitialGetData"

function Orders() {
  const { dispatchGetData } = useInitialGetData()

  useEffect(() => {
    dispatchGetData()
  }, [])

  const currentOrder = useSelector((store: AppStore) => store.currentOrder)
  const {
    isTableSelected,
    tableSelectName,
    isPersonalSelected,
    personalSelectName,
  } = currentOrder

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
      >
        {isTableSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <TableRestaurantIcon
              fontSize="inherit"
              sx={{ mr: 0.5 }}
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
              fontSize="inherit"
              sx={{ mr: 0.5 }}
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
