import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { currencyPrice } from "@/helpers/currencyPrice"
import { AppStore } from "@/redux/models/store"
import {
  cleanProductsInCurrentOrder,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/slices/orderSlice"
import { AlertColor } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

const useCartOrder = () => {
  const dispatch = useDispatch()

  const currentOrder = useSelector(
    (store: AppStore) => store.orders.currentOrder
  )

  const settings = useSelector((store: AppStore) => store.orders.settings)
  const percent_iva = settings[0].percent_iva
  const { products } = currentOrder

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

  const handleCleanProductsInOrder = (product) => {
    dispatch(cleanProductsInCurrentOrder(product))
  }

  const calculateSubTotalPrice = () => {
    let priceTotal = 0

    products.forEach((product) => {
      priceTotal += product.product_count * product.product_base_price
    })

    return priceTotal
  }

  const calculateTotalPrice = () => {
    let priceTotal = 0

    products.forEach((product) => {
      priceTotal += product.product_count * product.product_base_price
    })

    return (priceTotal * percent_iva) / 100 + priceTotal
  }

  return {
    handleSnackBar,
    handleIncrement,
    handleDecrement,
    handleCleanProductsInOrder,
    calculateTotalPrice,
    calculateSubTotalPrice,
  }
}

export default useCartOrder
