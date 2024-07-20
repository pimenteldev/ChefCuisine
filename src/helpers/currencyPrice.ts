export const currencyPrice = (number: number) => {
  const formated = new Intl.NumberFormat("es-VE", {
    maximumSignificantDigits: 20,
  }).format(number)

  return formated
}
