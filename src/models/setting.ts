export interface Setting {
  count_items_inventary: number
  facturation_initial: number
  num_control: string
  num_last_facture: number
  percent_iva: number
  price_dollar: number
}

export const settingEmptyStat = {
  price_dollar: 0,
  percent_iva: 0,
  count_items_inventary: 0,
  num_control: "",
  num_last_facture: 0,
  facturation_initial: 0,
}
