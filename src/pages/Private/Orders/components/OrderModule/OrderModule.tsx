import React, { useEffect } from "react"
import useSelectors from "../../hooks/useSelectors"
import useCartOrder from "../../hooks/useCartOrder"
import { Breadcrumbs, Link } from "@mui/material"
import FilterOptions from "../FilterOptions/FilterOptions"
import OrderPreview from "../DialogContainer/DialogContainer"
import ProductsDash from "../ProductsDash/ProductsDash"
import SelectedPersonal from "../SelectedPersonal/SelectedPersonal"
import SelectedTable from "../SelectedTable/SelectedTable"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import DialogContainer from "../DialogContainer/DialogContainer"

function OrderModule() {
  const {
    dispatchGetData,
    isTableSelected,
    tableSelectName,
    isPersonalSelected,
    personalSelectName,
    isModalPreview,
  } = useSelectors()

  const { handleProductActions } = useCartOrder()

  useEffect(() => {
    handleProductActions("cleanOrder")
    dispatchGetData()
  }, [])

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {isTableSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            color="inherit"
            onClick={() => handleProductActions("cleanOrder")}
          >
            <TableRestaurantIcon
              fontSize="small"
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
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            color="inherit"
            onClick={() => handleProductActions("cleanOrder")}
          >
            <AccountCircleIcon
              fontSize="small"
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
      {isTableSelected && isPersonalSelected && (
        <>
          <FilterOptions />
          <ProductsDash />
        </>
      )}

      {isTableSelected && isPersonalSelected && isModalPreview && (
        <DialogContainer />
      )}
    </>
  )
}

export default OrderModule
