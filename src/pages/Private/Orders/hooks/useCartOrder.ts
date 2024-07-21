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

  const { products } = useSelector(
    (store: AppStore) => store.orders.currentOrder
  )

  const { percent_iva, price_dollar } = useSelector(
    (store: AppStore) => store.orders.settings
  )

  console.log(percent_iva)
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

    products.forEach(({ product_base_price, product_count }) => {
      priceTotal += product_count * product_base_price
    })

    return priceTotal
  }

  const calculateTotalPrice = () => {
    let priceTotal = 0

    products.forEach(({ product_base_price, product_count }) => {
      priceTotal += product_count * product_base_price
    })

    return (priceTotal * percent_iva) / 100 + priceTotal
  }

  const calculateTotalPriceDolar = () => {
    let priceTotal = 0

    products.forEach(({ product_base_price, product_count }) => {
      priceTotal += product_count * product_base_price
    })

    const totalPriceBase = (priceTotal * percent_iva) / 100 + priceTotal

    return totalPriceBase / price_dollar
  }

  return {
    handleSnackBar,
    handleIncrement,
    handleDecrement,
    handleCleanProductsInOrder,
    calculateTotalPrice,
    calculateSubTotalPrice,
    calculateTotalPriceDolar,
  }
}

export default useCartOrder
