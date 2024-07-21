export const currencyPrice = new Intl.NumberFormat("es-VE", {
  maximumSignificantDigits: 4,
})

export const currencyPriceDolar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 4,
})
