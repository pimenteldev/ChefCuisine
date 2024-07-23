import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { ProductInOrder } from "@/models/products"
import {
  addToOrder,
  cleanCurrentOrder,
  cleanProductsInCurrentOrder,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  removeProductInCurrentOrder,
  toggleModalPreview,
} from "@/redux/slices/orderSlice"
import { AlertColor } from "@mui/material"
import { useDispatch } from "react-redux"
import { FilterContext, useOrderViewContext } from "../Context/ContextProvider"
import { handleExitCartSidebar } from "../components/Cart/Cart"
import { useContext } from "react"
import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog"

const useCartOrder = () => {
  const dispatch = useDispatch()

  const { filter, setDialog } = useOrderViewContext()

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  type ProductAction =
    | "addProduct"
    | "incrementProduct"
    | "decrementProduct"
    | "cleanProducts"
    | "removeProduct"
    | "cleanOrder"
    | "toggleModalPreview"

  const handleProductActions = (
    action: ProductAction,
    product?: ProductInOrder
  ) => {
    switch (action) {
      case "addProduct":
        dispatch(addToOrder(product))
        break
      case "incrementProduct":
        dispatch(incrementQuantity(product))
        break
      case "decrementProduct":
        if (product.product_count === 1) {
          dispatch(removeItem(product))
          handleSnackBar(`Has Eliminado un Producto del Pedido`, "warning")
        } else {
          dispatch(decrementQuantity(product))
        }
        break
      case "removeProduct":
        dispatch(removeProductInCurrentOrder(product))
        break
      case "cleanProducts":
        dispatch(cleanProductsInCurrentOrder(product))
        break
      case "cleanOrder":
        dispatch(cleanCurrentOrder())
        break
      case "toggleModalPreview":
        handleExitCartSidebar()

        setDialog({ action: "preview" })
        dialogOpenSubject$.setSubject = true

        dispatch(toggleModalPreview())
        break
      default:
        // Handle default case
        break
    }
  }

  const calculatePrices = (
    products: ProductInOrder[],
    percent_iva: number,
    price_dollar: number
  ) => {
    let priceTotal = 0

    products.forEach(({ product_base_price, product_count }) => {
      priceTotal += product_count * product_base_price
    })

    const subTotalPrice = priceTotal
    const totalPrice = (priceTotal * percent_iva) / 100 + priceTotal
    const totalPriceDolar = totalPrice / price_dollar

    return {
      subTotalPrice,
      totalPrice,
      totalPriceDolar,
    }
  }

  const filterProducts = (products) => {
    if (filter.category === 0) {
      return products.filter((product) => {
        return product.product_status === 1
      })
    }

    return products.filter((product) => {
      return (
        product.product_category === filter.category &&
        product.product_status === 1
      )
    })
  }

  return {
    handleSnackBar,
    handleProductActions,
    calculatePrices,
    filterProducts,
  }
}

export default useCartOrder
