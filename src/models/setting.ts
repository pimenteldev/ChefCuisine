export interface Setting {
  price_dollar: number
  percent_iva: number
  count_items_inventary: number
  num_control: string
  num_last_facture: number
  facturation_initial: number
}

export const settingEmptyStat = {
  price_dollar: 0,
  percent_iva: 0,
  count_items_inventary: 0,
  num_control: "",
  num_last_facture: 0,
  facturation_initial: 0,
}
