export const currencyPrice = (product_base_price: number) => {
  return product_base_price.toLocaleString("es-VE", {
    style: "currency",
    currency: "BSF",
  })
}
